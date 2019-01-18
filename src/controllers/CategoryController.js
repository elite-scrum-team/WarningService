const db = require('../models');

module.exports = {
    async retrive() {
        try {
            const res = await db.category.findAll();
            return res.map(r => r.dataValues);
        } catch (err) {
            console.error(err);
            throw err;
        }
    },
};
