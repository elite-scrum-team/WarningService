const Sequelize = require('sequelize');

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
        },
        {}
    );
    Comment.associate = models => {
        Comment.belongsTo(models.warning);
    };
    return Comment;
};
