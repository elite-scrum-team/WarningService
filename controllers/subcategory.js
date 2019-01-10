const { SubCategory } = require('../models')



module.exports = {

    create: async (categoryName, MainCategoryId) =>
        SubCategory
        .create({ ...arguments })
        .then(res => res.dataValues),

    read: async (id) =>
        SubCategory
        .findById(id, { raw: true }),

    readAll: async () =>
        SubCategory
        .findAll({ raw: true }),

    delete: async (id) =>
        SubCategory
        .findById(id)
        .then(cat => cat.destroy())
        .then(deleted => deleted.dataValues)

}
