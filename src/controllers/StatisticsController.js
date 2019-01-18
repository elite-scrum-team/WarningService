const db = require('../models');

module.exports = {
    async distrobution(from, to) {
        const result = await db.sequelize.query(
            'SELECT categories.name, COUNT(*) as count FROM warnings JOIN categories ON categoryId = categories.id WHERE warnings.createdAt > STR_TO_DATE(:from, "%m/%d/%Y") AND warnings.createdAT < STR_TO_DATE(:to, "%m/%d/%Y") GROUP BY categoryId;',
            { replacements: { from, to }, type: db.Sequelize.QueryTypes.SELECT }
        );
        console.log(result);
    },
};
