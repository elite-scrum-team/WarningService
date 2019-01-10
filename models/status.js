'use strict'
module.exports = (sequelize, DataTypes) => {
    const Status = sequelize.define('Status', {
        title: DataTypes.STRING,
        description: DataTypes.TEXT,

        UserId: DataTypes.INTEGER
    }, {})
    Status.associate = function(models) {
        Status.belongsTo(models.Warning)
    }
    return Status
}