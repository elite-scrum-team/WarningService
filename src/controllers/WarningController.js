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
            const location = MapService.location.create(warning.location);
            console.log("Location: " + location);
            instance.locationId = location.id;

            // Create instance in db
            const res = await db.warning.create(instance);
            return res.dataValues;
        } catch(err) {
            console.error(err);
            throw err;
        }    
    }     

};

