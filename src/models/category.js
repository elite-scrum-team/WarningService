const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('category', {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
        },
        name: {
            type: DataTypes.TEXT,
        },
    });
    return Category;
};
