const { Comment } = require('../models')



module.exports = {

    create: async (comment, image, UserId, WarningId) =>
        Comment
        .create({ ...args }),

    read: async (id) =>
        Comment
        .findById(id),

    readAll: async () =>
        Comment
        .findAll(),

    delete: async (id) =>
        Comment
        .findById(id)
        .then(com => com.destroy())

}