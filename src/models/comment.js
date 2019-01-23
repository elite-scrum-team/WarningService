const Sequelize = require('sequelize');
const InterestGroupService = require('../services/InterestGroupService');

module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define(
        'comment',
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: Sequelize.UUIDV4,
            },

            content: {
                type: DataTypes.STRING,
                defaultValue: '',
            },

            userId: {
                type: DataTypes.UUID,
            },

            fileURL: {
                type: DataTypes.TEXT,
            },
        },
        {
            hooks: {
                afterCreate: async (comment, _) => {
                    const warning = await comment.getWarning();
                    const categoryName = await warning
                        .getCategory()
                        .then(it => it.dataValues.name);

                    InterestGroupService.sendUpdate(
                        categoryName,
                        comment.dataValues.content,
                        warning.dataValues.id
                    );
                },
            },
        }
    );
    Comment.associate = models => {
        Comment.belongsTo(models.warning);
    };
    return Comment;
};
