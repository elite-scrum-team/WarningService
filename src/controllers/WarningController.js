const db = require('../models');
const MapService = require('../services/MapService');

module.exports = {
    async create(warning, userId) {
        const instance = {
            userId: userId,
            description: warning.description,
        };

        try {
            // Create and get locationId from MapService
            const location = await MapService.location.create(warning.location);
            instance.locationId = location.id;
            if(!location) {
                throw new Error('Could not store location...');
            }
            const res = await db.sequelize.transaction(async t => {
                const warningInstance = await db.warning.create(instance);
                const statusInstance = await db.status.create({ warningId: warningInstance.id, userId: warningInstance.userId });
                return warningInstance;
            })
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
                    order: [[ 'createdAt', 'DESC' ]] ,
                    limit: 1
                }, { model: db.category }]
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
        const instance = (await db.warning.findByPk(id)).dataValues;
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

