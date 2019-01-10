const { Status } = require('../models')



module.exports = {

    create: async (title, description, UserId, WarningId) =>
        Status
        .create({ ...args }),

    read: async (id) =>
        Status
        .findById(id),

    readAll: async () =>
        Status
        .findAll(),

    delete: async (id) =>
        Status
        .findById(id)
        .then(stat => stat.destroy())

}