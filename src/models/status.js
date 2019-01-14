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

        userId: {
            type: DataTypes.UUID
        }
    }, {})
    Status.assosiate = models => {
        Status.belongsTo(models.Warning)
    }
    return Status;
}
