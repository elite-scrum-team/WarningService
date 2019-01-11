'use strict';
module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define(
        'Comment',
        {
            comment: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            image: DataTypes.STRING,

            UserId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {}
    );
    Comment.associate = function(models) {
        Comment.belongsTo(models.Warning);
    };
    return Comment;
};
