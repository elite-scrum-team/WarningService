'use strict'
module.exports = (sequelize, DataTypes) => {
    const Status = sequelize.define('Status', {
        description: DataTypes.TEXT,
        type: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },

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