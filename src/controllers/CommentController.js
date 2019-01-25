const db = require('../models');

/**
 * Comment Controller
 * @module controllers/CommentController
 */

module.exports = {
    /**
     * @function
     * Function to create a persisted comment instance
     *
     * @param {UUID} warningId
     * @param {string} content
     * @param {string} fileURL
     * @param {UUID} userId
     *
     * @returns {Object} Returns the comment instance data values
     */
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
