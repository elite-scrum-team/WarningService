//Unit-Testing a Model’s Name and Properties

const {
    sequelize,
    dataTypes,
    checkModelName,
    checkPropertyExists,
} = require('sequelize-test-helpers');

const statusModel = require('../models/status');

describe('src/models/status', () => {
    const Model = statusModel(sequelize, dataTypes);
    const instance = new Model();

    // checking if the model is the same instance as the newmodel()
    checkModelName(Model)('status');

    context('properties', () => {
        ['id', 'type', 'description', 'userId'].forEach(
          checkPropertyExists(instance)
        );
    });
});