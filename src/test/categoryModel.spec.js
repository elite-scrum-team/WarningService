//Unit-Testing a Model’s Name and Properties

const {
    sequelize,
    dataTypes,
    checkModelName,
    checkPropertyExists,
} = require('sequelize-test-helpers');

const categoryModel = require('../models/category');

describe('src/models/category', () => {
    const Model = categoryModel(sequelize, dataTypes);
    const instance = new Model();

    // checking if the model is the same instance as the newmodel()
    checkModelName(Model)('category');

    context('properties', () => {
        ['id', 'name'].forEach(
          checkPropertyExists(instance)
        );
    });
});