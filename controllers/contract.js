const { Contract } = require('../models')



module.exports = {

    create: async (description, UserId) =>
        Contract
        .create({ description, UserId }),

    read: async (id) =>
        Contract
        .findById(id),

    readAll: async () =>
        Contract
        .findAll(),

    delete: async (id) =>
        Contract
        .findById(id)
        .then(con => con.destroy())

}