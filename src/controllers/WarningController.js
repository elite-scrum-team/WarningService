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
            const result = db.warning.findAll({ 
                offset, limit, 
                include: [{ 
                    model: db.status, 
                    order: [[ 'createdAt', 'DESC' ]] ,
                    limit: 1
                }, { model: db.category }]
            })

            const locations = await MapService.location.retrieve({id__in: result.map(it => it.dataValues.locationId)});
            console.log(locations);
            return result.map(it => it.dataValues)
        } catch (err) {
            console.error(err)
            throw err
        }
    },

    async retriveOne(id) {
        const instance = await db.warning.findById(id);
        return instance; 
    
    }

};

