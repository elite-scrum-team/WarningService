const db = require('../models');

const categories = require('./categories');

categories.containeditems.forEach(async (category) => {
    if (category.status === 'valid') {
        await db.category.findOrCreate({
            where: {name: category.name}
        }).spread((cat, created) => {
            console.log(cat.get({
                plain: true
            }));
            console.log(created);
        });
    } else if (category.status === 'unvalid') {
        db.category.destroy({
            where: {name: category.name}
        }).spread((cat, created) => {
            console.log(cat.get({
                plain: true
            }));
            console.log(created);
        });
    }
});