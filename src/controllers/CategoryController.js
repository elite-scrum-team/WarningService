const db = require('../models');

module.exports = {
    async retrive() {
        try {
            const res = await db.category.findAll();
            if (res === undefined) {
                return null;
            } else if (!Array.isArray(res)) {
                return res.dataValues;
            } else {
                return res.map(r => r.dataValues);
            }
        } catch(err) {
            console.error(err);
            throw err;
        }
    }
};
