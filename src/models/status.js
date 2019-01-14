const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    const Status = sequelize.define('status', {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4
        },

        type: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },

        description: {
            type: DataTypes.STRING,
            defaultValue: ""
        },

        userId: {
            type: DataTypes.UUID
        }
    }, {})
    Status.associate = models => {
        Status.belongsTo(models.warning)
    }
    return Status;
}
