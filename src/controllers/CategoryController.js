const db = require('../models');

module.exports = {
    async retrive() {
        return await db.category.findAll();
    }

}
