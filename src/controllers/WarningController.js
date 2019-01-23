const db = require('../models');
const MapService = require('../services/MapService');
const UserService = require('../services/UserService');
const InterestGroupService = require('../services/InterestGroupService');

const Op = require('sequelize').Op;

const flatten = require('../util/flatten');

const asyncForEach = require('../util/asyncForEach');

module.exports = {
    async create({ description, location, categoryId }, userId) {
        const instance = {
            userId,
            description,
            categoryId,
        };

        try {
            // Create and get locationId from MapService
            const newLocation = await MapService.location.create(location);
            instance.locationId = newLocation.id;
            if (!newLocation) {
                throw new Error('Could not store location...');
            }
            const res = await db.sequelize.transaction(async t => {
                const warningInstance = await db.warning.create(instance);
                const statusInstance = await db.status.create({
                    warningId: warningInstance.id,
                    userId: warningInstance.userId,
                });
                return warningInstance;
            });
            await res.reload({ include: [{ all: true }] });
            return res.dataValues;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    async retrieve(
        {
            offset,
            limit,
            excludeStatus,
            onlyStatus,
            useUserId = false,
            municipality,
            groupId,
            positions, // Location ids
            dateSort,
        },
        userId
    ) {
        try {
            let where = {};
            let order = [];
            let contractInclude = {
                model: db.contract,
            };

            // UserId filter
            if (useUserId) {
                if (userId) where.userId = userId;
                else return { error: 'No userId received', status: 400 };
            }

            // OnlyStatus filter
            if (onlyStatus) {
                if (!(onlyStatus instanceof Array))
                    onlyStatus = [Number.parseInt(onlyStatus)];
                if (onlyStatus.length > 0) {
                    onlyStatus = onlyStatus.map(it =>
                        it instanceof Number ? it : Number.parseInt(it)
                    );
                    where.latestStatusType = {
                        [Op.in]: onlyStatus,
                    };
                }
            }

            // ExcludeStatus filter
            if (excludeStatus && !onlyStatus) {
                if (!(excludeStatus instanceof Array))
                    excludeStatus = [Number.parseInt(excludeStatus)];
                if (excludeStatus.length > 0) {
                    excludeStatus = excludeStatus.map(it =>
                        it instanceof Number ? it : Number.parseInt(it)
                    );
                    where.latestStatusType = {
                        [Op.notIn]: excludeStatus,
                    };
                }
            }

            // Municipality filter
            if (municipality) {
                let locationIdsFromMunicipality = await MapService.location.retrieve(
                    { municipality }
                );

                if (
                    locationIdsFromMunicipality instanceof Array &&
                    locationIdsFromMunicipality.length > 0 &&
                    locationIdsFromMunicipality[0].id !== undefined
                ) {
                    locationIdsFromMunicipality = locationIdsFromMunicipality.map(
                        it => it.id
                    );
                    where.locationId = { [Op.in]: locationIdsFromMunicipality };
                } else
                    return {
                        error:
                            'MapService failed fetching warningIds from municipality',
                        status: 400,
                    };
            }

            // GroupID filter
            if (groupId && !municipality) {
                contractInclude.where = {
                    groupId,
                };
            }

            // Location Id filter
            if (positions && !groupId && !municipality) {
                if (!(positions instanceof Array)) {
                    positions = [positions];
                }
                if (positions.length > 0) {
                    where.locationId = {
                        [Op.in]: positions,
                    };
                }
            }

            // Sort by date (dateSort)
            if (dateSort) {
                if (dateSort === 'DESC' || dateSort === 'ASC') {
                    order.push(['createdAt', dateSort]);
                }
            }

            let r = await db.warning.findAll({
                offset,
                limit,
                where,
                include: [
                    {
                        model: db.status,
                        separate: true,
                        order: [['createdAt', 'DESC']],
                        limit: 1,
                    },
                    { model: db.category },
                    { model: db.image },
                    contractInclude,
                ],
                order,
            });

            const ids = await r
                .map(it => it.dataValues.locationId)
                .filter(it => it);
            const locations = await MapService.location.retrieve({
                id__in: ids,
            });

            const locationsObject = {};
            await locations.map(it => (locationsObject[it.id] = it));

            return r.map(it => {
                const warningFromDatabase = it.dataValues;
                const location =
                    locationsObject[warningFromDatabase.locationId];
                delete warningFromDatabase['locationId'];
                if (location) warningFromDatabase.location = location;
                else warningFromDatabase.location = null;
                return warningFromDatabase;
            });
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    async retriveOne(id, userId) {
        const instance = (await db.warning.findByPk(id, {
            include: [
                {
                    model: db.status,
                    separate: true,
                    order: [['createdAt', 'DESC']],
                    limit: 1,
                },
                { model: db.comment },
                { model: db.category },
                { model: db.image },
                { model: db.contract },
            ],
        })).dataValues;
        // Fetch location info for instance
        const location = await MapService.location.retrieveOne(
            instance.locationId
        );
        delete instance['locationId'];
        instance.location = location;

        // Fetch subscribed info for instance
        let isSubscribed = false;
        if (userId) {
            let userInfo = await InterestGroupService.userInfo(userId);
            console.log(userInfo.status);
            if (userInfo.status === 200) {
                isSubscribed = (await userInfo.json()).id;
            }
        }
        instance.isSubscribed = isSubscribed;

        return instance;
    },

    async retrieveContent(id) {
        const instance = await db.warning.findByPk(id, {
            include: [{ all: true }],
        });
        if (!instance) return db.sequelize.Promise.reject('Instance failed');

        // Add company names to contract
        console.log('fetching contract group names');
        if (instance.dataValues.contracts) {
            await asyncForEach(instance.dataValues.contracts, async (it, i) => {
                const r = await UserService.retrieveOneGroup(
                    it.dataValues.groupId
                );

                instance.dataValues.contracts[i].dataValues['name'] = !r.isError
                    ? (await r.json()).name
                    : 'could not get name';
            });
        }
        console.log('done fetching group names');

        // Map sequelize output to frontend mess
        const content = Object.entries(instance.toJSON())
            .filter(([k, v]) => v instanceof Array && k !== 'Images')
            .map(([k, v]) => v.map(it => ({ type: k, data: it })));

        const flatContent = flatten(content);

        const sortedFlatContent = flatContent.sort(
            (a, b) => new Date(b.data.createdAt) - new Date(a.data.createdAt)
        );

        return sortedFlatContent;
    },

    async update(id, values) {
        try {
            const warning = await db.warning.findByPk(id);
            return await warning.update(values);
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    async delete(id, userId) {
        try {
            const res = await db.warning.findByPk(id);
            if (res.latestStatusType === 0 && res.userId === userId) {
                return await res.destroy();
            }
            return { error: 'Unable to delete warning', status: 400 };
        } catch (err) {
            console.error(err);
            throw err;
        }
    },
};
