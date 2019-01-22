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

    async create(name) {
        try {
            const res = await db.category.create({ name });
            return res;
        } catch (err) {
            console.error(err);
            return null;
        }
    },

    async delete(commentId) {
        try {
            const res = await db.category.destroy({
                where: {
                    id: commentId,
                },
            });
            return res;
        } catch (error) {
            console.error(error);
            return null;
        }
    },
};
