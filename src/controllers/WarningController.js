const db = require('../models');

module.exports = {
    async create(warning, userId) {
        const instance = {
            userId: userId,
            description: warning.description,
        };
        try {
            const res = await db.warning.create(instance);
            return res.dataValues;
        } catch(err) {
            console.error(err);
            throw err;
        }
    }
};

