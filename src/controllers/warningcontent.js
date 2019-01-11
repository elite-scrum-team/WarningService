const { Warning, Comment, Contract, Status, Image } = require('../models');
const flatMap = require('array.prototype.flatmap');

module.exports = {
    read: async id =>
        Warning.findByPk(id, {
            include: [{ all: true }],
        }).then(res =>
            flatMap(
                Object.entries(res.toJSON()).filter(
                    ([k, v]) => v instanceof Array && k !== 'Images'
                ),
                ([k, v]) => v.map(it => ({ type: k, data: it }))
            ).sort(
                (a, b) =>
                    new Date(b.data.createdAt) - new Date(a.data.createdAt)
            )
        ),
};
