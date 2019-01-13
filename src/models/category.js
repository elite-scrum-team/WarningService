
module.exports = (sequelize, DataTypes) => {
    const Category = require('categories', {
        id: {
            primaryKey: true,
            type: UUID,
        },
        name: {
            type: DataTypes.TEXT,
        }
    });

}
