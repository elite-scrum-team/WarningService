const { Status } = require('../models')



module.exports = {

    create: async (title, description, UserId, WarningId) =>
        Status
        .create({ ...arguments })
        .then(res => res.dataValues),

    read: async (id) =>
        Status
        .findById(id, { raw: true }),

    readAll: async () =>
        Status
        .findAll({ raw: true }),

    delete: async (id) =>
        Status
        .findById(id)
        .then(stat => stat.destroy())
        .then(deleted => deleted.dataValues)

}