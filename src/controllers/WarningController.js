const db = require('../models');
const MapService = require('../services/MapService');

const flatten = require('../util/flatten')

module.exports = {
    async create({ description, location, categoryId }, userId) {
        const instance = {
            userId, description, categoryId
        };

        try {
            // Create and get locationId from MapService
            const newLocation = await MapService.location.create(location);
            instance.locationId = newLocation.id;
            if(!newLocation) {
                throw new Error('Could not store location...');
            }
            const res = await db.sequelize.transaction(async t => {
                const warningInstance = await db.warning.create(instance);
                const statusInstance = await db.status.create({ warningId: warningInstance.id, userId: warningInstance.userId });
                return warningInstance;
            })
            await res.reload({include: [{all: true}]})
            return res.dataValues;
        } catch(err) {
            console.error(err);
            throw err;
        }
    },

    async retrieve({ offset, limit, exclude, useUserId = false, municipality }, userId) {
        // TODO: userId logic
        try {
            let where = {}
            if (useUserId && userId) where.userId = userId
            if (exlude) {
                if (exlude.status instanceof Array) 
                    where.status = { [Op.notIn]: exclude.status }
                else {
                    throw Error("No supported filters in exclude [status]")
                }
            }
                
            if (municipality) {
                let warningIdsFromMunicipality = await MapService.retrieve({ municipality })

                if (warningIdsFromMunicipality instanceof Array && warningIdsFromMunicipality.length > 0 && warningIdsFromMunicipality[0].id !== undefined) {
                    warningIdsFromMunicipality = warningIdsFromMunicipality.map(it => it.id)
                    where.locationId = { [Op.in]: warningIdsFromMunicipality }
                } else
                    throw Error("MapService failed fetching warningIds from municipality")
            }
            

            const r = db.warning.findAll({
                offset, limit,
                where,
                include: [{
                    model: db.status,
                    separate: true,
                    order: [[ 'createdAt', 'DESC' ]],
                    limit: 1
                }, { model: db.category }],
            })
            const ids = await r.map(it => it.dataValues.locationId).filter(it => it);
            const locations = await MapService.location.retrieve({id__in: ids});

            const locationsObject = {};
            await locations.map(it => locationsObject[it.id] = it);

            return r.map(it => {
                const warningFromDatabase = it.dataValues;
                const location = locationsObject[warningFromDatabase.locationId];
                delete warningFromDatabase['locationId'];
                if (location)
                    warningFromDatabase.location = location;
                else
                    warningFromDatabase.location = null;
                return warningFromDatabase;
            })
        } catch (err) {
            console.error(err)
            throw err
        }
    },

    async retriveOne(id) {
        const instance = (await db.warning.findByPk(id, {
            include: [{
                model: db.status,
                separate: true,
                order: [[ 'createdAt', 'DESC' ]],
                limit: 1
            }, { model: db.category }, { model: db.image }],
        })).dataValues;
        const location = await MapService.location.retrieveOne(instance.locationId);
        delete instance['locationId'];
        instance.location = location;
        return instance;

    },

    async retrieveContent(id) {
        const instance = await db.warning.findByPk(id, {
            include: [{ all: true }]
        })
        if(!instance) return db.sequelize.Promise.reject("Instance failed")
        const content = Object.entries(instance.toJSON())
            .filter(([k, v]) => v instanceof Array && k !== 'Images')
            .map(([k, v]) => v.map(it => ({ type: k, data: it })))

        const flatContent = flatten(content)

        const sortedFlatContent =
            flatContent
                .sort((a, b) => new Date(b.data.createdAt) - new Date(a.data.createdAt))

        return sortedFlatContent
    },


    async update(id, values) {
        try {
            const warning = await db.warning.findByPk(id)
            return await warning.update(values)
        } catch (err) {
            console.error(err)
            throw err
        }
    }
};

