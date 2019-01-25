const db = require('../models');

module.exports = {
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
