//Unit-Testing a Model’s Name and Properties

const {
    sequelize,
    dataTypes,
    checkModelName,
    checkPropertyExists,
} = require('sequelize-test-helpers');

const warningModel = require('../models/warning');

describe('src/models/warning', () => {
    const Model = warningModel(sequelize, dataTypes);
    const instance = new Model();

    // checking if the model is the same instance as the newmodel()
    checkModelName(Model)('warning');

    context('properties', () => {
        ['id', 'description', 'userId', 'locationId'].forEach(
          checkPropertyExists(instance)
        );
    });
});