'use strict';
module.exports = (sequelize, DataTypes) => {
    const MainCategory = sequelize.define(
        'MainCategory',
        {
            categoryName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {}
    );
    MainCategory.associate = function(models) {
        MainCategory.hasMany(models.SubCategory);
    };
    return MainCategory;
};
