const { Contract } = require('../models')



module.exports = {

    create: async (description, UserId) =>
        Contract
        .create({ ...arguments })
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