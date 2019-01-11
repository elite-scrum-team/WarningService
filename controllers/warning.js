const { Warning } = require('../models')



module.exports = {

    create: async (data) =>
        Warning
        .create(data)
        .then(res => res.dataValues),

    read: async (id) =>
        Warning
        .findByPk(id, {
            include: [
                { all: true }
            ]
        })
        .then(res => res.toJSON()),

    readAll: async () =>
        Warning
        .findAll({ raw: true }),

    delete: async (id) =>
        Warning
        .findById(id)
        .then(war => war.destroy())
        .then(deleted => deleted.dataValues)

    // getAllInfo for a warning
}