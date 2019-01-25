const db = require('../models');

//db.image.sync({force: true})

/**
 * Image Controller
 * @module controllers/ImageController
 */

module.exports = {
    /**
     * @function
     * Function to create a persisted image instance
     *
     * @param { {warningId: UUID, fileURL: string} } imageData
     *
     * @returns { Object } Returns the image instance data values
     */
    async create({ warningId, fileURL }) {
        if (!fileURL) {
            return null;
        }

        const instance = {
            warningId,
            fileURL,
        };

        try {
            const result = await db.image.create(instance);
            return result.dataValues;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },
};
