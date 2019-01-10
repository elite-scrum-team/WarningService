'use strict'
module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        comment: DataTypes.TEXT,
        image: DataTypes.STRING,

        UserId: DataTypes.INTEGER
    }, {})
    Comment.associate = function(models) {
        Comment.belongsTo(models.Warning)
    }
    return Comment
}