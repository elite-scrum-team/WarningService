const { MainCategory } = require('../models')



module.exports = {

    create: async (categoryName) => 
        MainCategory
        .create({ categoryName }),

    read: async (id) => 
        MainCategory
        .findById(id),

    readAll: async () =>
        MainCategory
        .findAll(),

    delete: async (id) =>
        MainCategory
        .findById(id)
        .then(cat => cat.destroy())

}