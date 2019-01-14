const db = require('../models');

module.exports = {
    async create(warning, userId) {
        const instance = {
            userId: userId,
            description: warning.description,
        };
        try {
            const res = await db.sequelize.transaction(async t => {
                const warningInstance = await db.warning.create(instance);
                const statusInstance = await db.status.create({ warningId: warningInstance.id, userId: warningInstance.userId });
                return warningInstance;
            })
            return res.dataValues;
        } catch(err) {
            console.error(err);
            throw err;
        }    
    },   


    async retrieve(filters, userId) {
        // TODO: userId logic
        const { offset, limit } = filters
        try {
            const result = db.warning.findAll({ offset, limit, include: [{ all: true }] })
            return result.map(it => it.dataValues)
        } catch (err) {
            console.error(err)
            throw err
        }
    },


    async retriveOne(id) {
        const instance = await db.warning.findById(id);
        return instance; 
    
    }
};

