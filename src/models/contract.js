const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Contract = sequelize.define('contract', {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
        },

        groupId: DataTypes.UUID,

        comment: DataTypes.STRING,
    });
    Contract.associate = models => {
        Contract.belongsTo(models.warning);
    };

    return Contract;
};
