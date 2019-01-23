const Sequelize = require('sequelize');
const InterestGroupService = require('../services/InterestGroupService');

module.exports = (sequelize, DataTypes) => {
    const Status = sequelize.define(
        'status',
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: Sequelize.UUIDV4,
            },

            type: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },

            description: {
                type: DataTypes.STRING,
                defaultValue: '',
            },

            userId: {
                type: DataTypes.UUID,
            },
        },
        {
            hooks: {
                afterCreate: async (status, _) => {
                    const warning = await status.getWarning();
                    const categoryName = await warning
                        .getCategory()
                        .then(it => it.dataValues.name);

                    InterestGroupService.sendUpdate(
                        categoryName, // title
                        status.dataValues.description, // comment
                        warning.dataValues.id, // warningId
                        status.dataValues.type // status
                    );
                },
            },
        }
    );
    Status.associate = models => {
        Status.belongsTo(models.warning);
    };
    return Status;
};
