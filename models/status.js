'use strict'
module.exports = (sequelize, DataTypes) => {
    const Status = sequelize.define('Status', {
        title: DataTypes.STRING,
        description: DataTypes.TEXT,

        userID: DataTypes.INTEGER
    }, {})
    Status.associate = function(models) {
        Status.belongsTo(models.Warning)
    }
    return Status
}