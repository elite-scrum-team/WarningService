'use strict';
module.exports = (sequelize, DataTypes) => {
    const SubCategory = sequelize.define(
        'SubCategory',
        {
            categoryName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {}
    );
    SubCategory.associate = function(models) {
        SubCategory.belongsTo(models.MainCategory);
    };
    return SubCategory;
};
