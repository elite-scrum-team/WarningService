const db = require('../models');

const NotificationService = require('../services/NotificationService');

module.exports = {
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
