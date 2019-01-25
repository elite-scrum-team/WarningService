const db = require('../models');

const NotificationService = require('../services/NotificationService');

/**
 * Contract Controller
 * @module controllers/ContractController
 *
 * @requires NotificationService
 */

module.exports = {
    /**
     * @function
     * Function to create a persisted contract instance
     *
     * @param { {warningId: UUID, groupId: UUID, comment: string} } contractData
     * @param { UUID } userId
     *
     * @returns { Object } Returns the contract instance data values
     */
    async create({ warningId, groupId, comment }, userId) {
        try {
            const contract = await db.contract.create({
                warningId,
                groupId,
                comment,
            });
            if (contract) {
                await NotificationService.email.contract(contract);
                return contract.dataValues;
            } else return { error: 'Could not create contract', status: 500 };
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
};
