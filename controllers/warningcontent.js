const { Warning, Comment, Contract, Status, Image } = require('../models')



module.exports = {

    read: async (id) =>
        Warning
        .findByPk(id, {
            include: [{ all: true }]
        })
        .then(res =>
            Object.entries(res.toJSON())
            .filter(([k, v]) => v instanceof Array && k !== 'Images')
            .flatMap(([k, v]) => v.map(it => ({ type: k, data: it }))))
            //.sort((a, b) => (new Date(a.data.createdAt) - (new Date(b.data.createdAt)))))

}