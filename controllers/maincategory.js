const { MainCategory } = require('../models')



module.exports = {

    create: async (categoryName) => 
        MainCategory
        .create({ ...arguments })
        .then(res => res.dataValues),

    read: async (id) => 
        MainCategory
        .findById(id, { raw: true }),

    readAll: async () =>
        MainCategory
        .findAll({ raw: true }),

    delete: async (id) =>
        MainCategory
        .findById(id)
        .then(cat => cat.destroy())
        .then(deleted => deleted.dataValues)

}