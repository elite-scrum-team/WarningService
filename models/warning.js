'use strict'
module.exports = (sequelize, DataTypes) => {
    const Warning = sequelize.define('Warning', {
        description: DataTypes.TEXT,

        UserId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }, // (FK that is stored in other service)
        LocationId: {
            type: DataTypes.INTEGER,
            allowNull: false
        } // (FK that is stored in other service)
    }, {})
    Warning.associate = function(models) {
        Warning.belongsTo(models.SubCategory)
        Warning.hasMany(models.Comment)
        Warning.hasMany(models.Status)
        Warning.hasMany(models.Contract)
        Warning.hasMany(models.Image)
    }
    return Warning
}