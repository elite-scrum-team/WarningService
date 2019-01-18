const db = require('../models')
const Op = require('sequelize').Op


module.exports = {

    async create({ type, description, warningId }, userId) {

        const instance = {
            type, description, warningId, userId
        };
        try {
            const result = await db.sequelize.transaction(async _ => {
                const statusInstance = await db.status.create(instance)
                await db.warning.update({
                    latestStatusType: type
                }, {
                    where: {
                        warningId
                    }
                })
                return statusInstance
            });
            return result.dataValues;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
};