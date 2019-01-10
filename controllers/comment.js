const { Comment } = require('../models')



module.exports = {

    create: async (comment, image, UserId, WarningId) =>
        Comment
        .create({ ...arguments })
        .then(res => res.dataValues),

    read: async (id) =>
        Comment
        .findById(id, { raw: true }),

    readAll: async () =>
        Comment
        .findAll({ raw: true }),

    delete: async (id) =>
        Comment
        .findById(id)
        .then(com => com.destroy())
        .then(deleted => deleted.dataValues)

}