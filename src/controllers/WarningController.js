const db = require('../models');
const MapService = require('../services/MapService');

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

    async retrieve(filters, userId) {
        // TODO: userId logic
        const { offset, limit } = filters
        try {
            const r = db.warning.findAll({ 
                offset, limit, 
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
            include: [{ all: true }],
            order: [
                [db.status, 'createdAt', 'DESC']
            ]
        })).dataValues;
        const location = await MapService.location.retrieveOne(instance.locationId);
        delete instance['locationId'];
        instance.location = location;
        return instance; 
    
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

