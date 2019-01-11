const { Contract } = require('../models')



module.exports = {

    create: async (data) =>
        Contract
        .create(data)
        .then(res => res.dataValues),

    read: async (id) =>
        Contract
        .findById(id, { raw: true }),

    readAll: async () =>
        Contract
        .findAll({ raw: true }),

    delete: async (id) =>
        Contract
        .findById(id)
        .then(con => con.destroy())
        .then(deleted => deleted.dataValues)

}