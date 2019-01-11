const { Image } = require('../models');

module.exports = {
    create: async data => Image.create(data).then(res => res.dataValues),

    read: async id => Image.findById(id, { raw: true }),

    readAll: async () => Image.findAll({ raw: true }),

    delete: async id =>
        Image.findById(id)
            .then(img => img.destroy())
            .then(deleted => deleted.dataValues),
};
