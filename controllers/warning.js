const { Warning } = require('../models')



module.exports = {

    create: async (description, UserId, LocationId, SubCategoryId) =>
        Warning
        .create({ ...arguments })
        .then(res => res.dataValues),

    read: async (id) =>
        Warning
        .findById(id, { raw: true }),

    readAll: async () =>
        Warning
        .findAll({ raw: true }),

    delete: async (id) =>
        Warning
        .findById(id)
        .then(war => war.destroy())
        .then(deleted => deleted.dataValues)

}