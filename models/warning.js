'use strict'
module.exports = (sequelize, DataTypes) => {
    const Warning = sequelize.define('Warning', {
        description: DataTypes.TEXT,

        UserId: DataTypes.INTEGER, // (FK that is stored in other service)
        LocationId: DataTypes.INTEGER // (FK that is stored in other service)
    }, {})
    Warning.associate = function(models) {
        Warning.belongsTo(models.SubCategory)
    }
    return Warning
}