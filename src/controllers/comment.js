const { Comment } = require('../models');

module.exports = {
    create: async data => Comment.create(data).then(res => res.dataValues),

    read: async id => Comment.findById(id, { raw: true }),

    readAll: async () => Comment.findAll({ raw: true }),

    delete: async id =>
        Comment.findById(id)
            .then(com => com.destroy())
            .then(deleted => deleted.dataValues),
};
