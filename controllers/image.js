const { Image } = require('../models')



module.exports = {

    create: async (url, WarningId) =>
        Image
        .create({ url, WarningId }),

    read: async (id) =>
        Image
        .findById(id),

    readAll: async () =>
        Image
        .findAll(),

    delete: async (id) =>
        Image
        .findById(id)
        .then(img => img.destroy())

}