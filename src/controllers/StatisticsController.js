const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const db = require('../models');

module.exports = {
    async distrobution(from, to) {
        const result = await db.sequelize.query(
            'SELECT categories.name, COUNT(*) as count FROM warnings JOIN categories ON categoryId = categories.id WHERE warnings.createdAt > STR_TO_DATE(:from, "%m/%d/%Y") AND warnings.createdAT < STR_TO_DATE(:to, "%m/%d/%Y") GROUP BY categoryId;',
            { replacements: { from, to }, type: db.Sequelize.QueryTypes.SELECT }
        );
        console.log(result);
    },

    warningDistribution: async (startDate, endDate, dateFormat, whereAddOn) =>
        db.warning
            .findAll({
                attributes: [
                    [
                        db.sequelize.fn(
                            'DATE_FORMAT',
                            db.sequelize.col('createdAt'),
                            dateFormat
                        ),
                        'date',
                    ],
                    [Sequelize.literal('COUNT(*)'), 'count'],
                ],
                where: {
                    createdAt: {
                        [Op.between]: [startDate, endDate],
                    },
                    ...whereAddOn,
                },
                group: ['date'],
            })
            .then(it => it.map(data => data.dataValues)),

    categoryDistribution: async (startDate, endDate, whereAddOn) =>
        db.category.findAll().then(data =>
            Promise.all(
                data.map(async it => {
                    let output = { name: it.dataValues.name };
                    output.warnings = await it.countWarnings({
                        where: {
                            createdAt: {
                                [Op.between]: [startDate, endDate],
                            },
                        },
                        ...whereAddOn,
                    });
                    return output;
                })
            )
        ),

    countWarnings: async (startDate, endDate, whereAddOn) =>
        db.warning
            .findOne({
                attributes: [
                    [db.sequelize.fn('COUNT', db.sequelize.col('id')), 'count'],
                ],
                where: {
                    createdAt: {
                        [Op.between]: [startDate, endDate],
                    },
                    ...whereAddOn,
                },
            })
            .then(it => it.dataValues),
};
