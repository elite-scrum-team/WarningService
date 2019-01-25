const db = require('../models');

/**
 * Score Controller
 * @module controllers/ScoreController
 */

module.exports = {
    /**
     * @function
     * Calculates a score for a user describing the quality of posts for that user
     * the score is based on tallying up the latest status for every warning the user
     * has posted where a statusCode of 4 gives -10 score and every other statusCode gives +1 score
     *
     * @param {UUID} userId
     *
     * @returns {integer}
     */
    async getScoreForUser(userId) {
        try {
            const typesForUser = await db.warning
                .findAll({
                    where: {
                        userId: userId,
                    },
                    include: [
                        {
                            model: db.status,
                            separate: true,
                            order: [['createdAt', 'DESC']],
                            limit: 1,
                        },
                    ],
                })
                .map(
                    it =>
                        it.dataValues.statuses.map(it2 => it2.dataValues)[0]
                            .type
                )
                .filter(it => it !== 0);
            let score = 0;
            typesForUser.map(e => {
                if (e === 4) {
                    score -= 10;
                } else {
                    score += 1;
                }
            });
            return score;
        } catch (err) {
            console.error(err);
        }
    },
};
