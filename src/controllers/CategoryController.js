const db = require('../models');

module.exports = {
    async retrive() {
        try {
            const res = await db.category.findAll();
            if (res === undefined) {
                return { error: 'no categories found', statusCode: 404 };
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
}
