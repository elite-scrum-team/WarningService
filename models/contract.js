'use strict'
module.exports = (sequelize, DataTypes) => {
    const Contract = sequelize.define('Contract', {
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        GroupId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {})
    Contract.associate = function(models) {
        Contract.belongsTo(models.Warning)
    }
    return Contract
}