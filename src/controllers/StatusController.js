const db = require('../models')

//db.status.sync({force: true})

module.exports = {

    async create({ type, description, warningId }, userId) {

        const instance = {
            type, description, warningId, userId
        };
        try {
            const result = await db.status.create(instance);
            return result.dataValues;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
};