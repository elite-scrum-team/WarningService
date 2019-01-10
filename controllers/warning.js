const { Warning } = require('../models')



module.exports = {

    create: async (image, description, UserId, LocationId, SubCategoryId) =>
        Warning
        .create({ ...args }),

    read: async (id) =>
        Warning
        .findById(id),

    readAll: async () =>
        Warning
        .findAll(),

    delete: async (id) =>
        Warning
        .findById(id)
        .then(war => war.destroy())

}