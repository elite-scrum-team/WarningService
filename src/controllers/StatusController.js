const db = require('../models');

/**
 * Status controller
 * @module controllers/StatusController
 */

module.exports = {
    /**
     * @function
     * Function to create a persisted status instance
     *
     * @param { { type: integer, desciption: string, warningId: UUID} } statusData
     * @param {UUID} userId
     *
     * @returns {Object} returns the data values to the created instance
     */
    async create({ type, description, warningId }, userId) {
        const instance = {
            type,
            description,
            warningId,
            userId,
        };
        try {
            const result = await db.sequelize.transaction(async _ => {
                const statusInstance = await db.status.create(instance);
                const warning = await db.warning.findByPk(warningId);
                await warning.update({
                    latestStatusType: type,
                });
                return statusInstance;
            });
            return result.dataValues;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },
};
