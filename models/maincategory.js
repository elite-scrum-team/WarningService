'use strict'
module.exports = (sequelize, DataTypes) => {
  const MainCategory = sequelize.define('MainCategory', {
    categoryName: DataTypes.STRING
  }, {})
  MainCategory.associate = function(models) {
    // associations can be defined here
  };
  return MainCategory
};