const db = require('../models');

module.exports = {
    async create(warningId, content, fileURL, userId) {
        try {
            const instance = await db.comment.create({
                warningId,
                content,
                fileURL,
                userId,
            });
            return instance;
        } catch (err) {
            console.error(err);
            return null;
        }
    },
};
