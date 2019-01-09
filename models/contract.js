'use strict'
module.exports = (sequelize, DataTypes) => {
    const Contract = sequelize.define('Contract', {
        description: DataTypes.TEXT,

        GroupID: DataTypes.INTEGER
    }, {})
    Contract.associate = function(models) {
        Contract.belongsTo(models.Warning)
    }
    return Contract
}