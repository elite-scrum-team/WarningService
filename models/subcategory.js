'use strict'
module.exports = (sequelize, DataTypes) => {
    const SubCategory = sequelize.define('SubCategory', {
        categoryName: DataTypes.STRING
    }, {})
    SubCategory.associate = function(models) {
        SubCategory.belongsTo(models.MainCategory)
    }
    return SubCategory
}