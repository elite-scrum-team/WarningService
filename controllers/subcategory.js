const { SubCategory } = require('../models')



module.exports = {

    create: async (categoryName, MainCategoryId) =>
        SubCategory
        .create({ categoryName, MainCategoryId }),

    read: async (id) =>
        SubCategory
        .findById(id),

    readAll: async () =>
        SubCategory
        .findAll(),

    delete: async (id) =>
        SubCategory
        .findById(id)
        .then(cat => cat.destroy())

}
