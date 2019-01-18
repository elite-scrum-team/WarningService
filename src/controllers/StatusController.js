const db = require('../models');

module.exports = {
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
                console.log(statusInstance);
                const warning = await db.warning.findByPk(warningId);
                await warning.update({
                    latestStatusType: type,
                });
                return statusInstance;
            });
            console.log(result);
            return result.dataValues;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },
};
