'use strict'
module.exports = (sequelize, DataTypes) => {
    const Status = sequelize.define('Status', {
        title: DataTypes.STRING,
        description: DataTypes.TEXT,

        UserId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {})
    Status.associate = function(models) {
        Status.belongsTo(models.Warning)
    }
    return Status
}