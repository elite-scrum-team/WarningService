const db = require('../models');

module.exports = {
    async create(warningId, content, userId) {
        try {
            const instance = await db.comment.create({
                warningId,
                content,
                userId,
            });
            return instance;
        } catch (err) {
            console.error(err);
            return null;
        }
    },
};
