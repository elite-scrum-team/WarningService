const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const db = require('../models');

/**
 * Statistics controller
 * @module controllers/StatisticsController
 *
 * @require sequelize
 */

module.exports = {
    /**
     * @function
     * Function that queries the count of registered warnings over a period of time and groups dates on the dateFormat parameter
     *
     * @param {string} startDat     - Used to determine the date range in which the statistics are valid
     * @param {string} endDate      - Used to determine the date range in which the statistics are valid
     * @param {string} dateFormat   - Used to determine what dates should be grouped together f.eks %Y-%m to group the distribution on year-month
     * @param {Object} whereAddOn   - Used to add where clauses to the statistics query
     *
     * @returns { [{date: string, count: integer}] } - Only returns dates and count where count is not 0
     */
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

    /**
     * @function
     * Function that queries the count of registered warnings over a period of time for all categories
     *
     * @param {string} startdate    - Used to determine the date range in which the statistics are valid
     * @param {string} endDate      - Used to determine the date range in which the statistics are valid
     * @param {Object} whereAddOn   - Used to add where clauses to the statistics query
     *
     * @returns { [{name: string, count: integer}] } - Will return an object for every category, even if the warning count for that category is 0
     */
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
                            ...whereAddOn,
                        },
                    });
                    return output;
                })
            )
        ),

    /**
     * @function
     * Function that counts warnings over a period of time, with optional where clause
     *
     * @param {string} startdate    - Used to determine the date range in which the statistics are valid
     * @param {string} endDate      - Used to determine the date range in which the statistics are valid
     * @param {Object} whereAddOn   - Used to add where clauses to the statistics query
     *
     * @returns { {count: integer} }
     */
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
