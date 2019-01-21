//Unit-Testing a Model’s Name and Properties

const {
    sequelize,
    dataTypes,
    checkModelName,
    checkPropertyExists,
} = require('sequelize-test-helpers');

const imageModel = require('../models/image');

describe('src/models/image', () => {
    const Model = imageModel(sequelize, dataTypes);
    const instance = new Model();

    // checking if the model is the same instance as the newmodel()
    checkModelName(Model)('image');

    context('properties', () => {
        ['id', 'fileURL'].forEach(checkPropertyExists(instance));
    });
});
