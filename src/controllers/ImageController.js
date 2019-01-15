const db = require('../models')

//db.status.sync({force: true})

module.exports = {

    async create(warningId, imageName, userId) {
        if(!imageName) {
            return;
        }

        const instance = {
            warningId,
            name: imageName,
        };
        
        try {
            const result = await db.image.create(instance)
            return result.dataValues;
        } catch (err) {
            console.error(err)
            throw err
        }
    }

}