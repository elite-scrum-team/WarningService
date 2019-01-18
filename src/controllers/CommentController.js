const db = require('../models');

module.exports = {
    async create(warningId, body, userId) {
        try {
            const instance = await db.comment.create({
                warningId,
                body,
                userId,
            });
            return instance;
        } catch (err) {
            console.error(err);
            return null;
        }
    },
};
