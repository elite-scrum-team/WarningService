'use strict'
module.exports = (sequelize, DataTypes) => {
    const Warning = sequelize.define('Warning', {
        image: DataTypes.STRING,
        description: DataTypes.TEXT,

        userID: DataTypes.INTEGER, // (FK that is stored in other service)
        locationID: DataTypes.INTEGER // (FK that is stored in other service)
    }, {})
    Warning.associate = function(models) {
        Warning.belongsTo(models.SubCategory)
    }
    return Warning
}