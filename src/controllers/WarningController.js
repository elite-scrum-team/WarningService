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
            console.log("Location: " + location);
            instance.locationId = location.id;
            if(!location) {
                throw new Error('Could not store location...');
            }

            // Create instance in db
            const res = await db.warning.create(instance);
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
            const result = db.warning.findAll({ offset, limit })
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

