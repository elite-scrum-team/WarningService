const { MainCategory } = require('../models');

module.exports = {
    create: async data => MainCategory.create(data).then(res => res.dataValues),

    read: async id => MainCategory.findById(id, { raw: true }),

    readAll: async () =>
        MainCategory.findAll({
            include: [{ all: true }],
        }),

    delete: async id =>
        MainCategory.findById(id)
            .then(cat => cat.destroy())
            .then(deleted => deleted.dataValues),
};
