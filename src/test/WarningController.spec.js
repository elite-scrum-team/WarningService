const proxyquire = require('proxyquire');
const chai = require('chai');
chai.use(require('sinon-chai'));
let expect = chai.expect;
const sinon = require('sinon');
const MapService = require('../services/MapService');
const transactionMock = require('./__mock__/sequelize');
const res = require('./__mock__/res');

const sinonStubPromise = require('sinon-stub-promise');
sinonStubPromise(sinon);


const mapStub = sinon.stub(MapService.location, 'create').resolves('1');
const resStub = sinon.stub(res, 'reload');

const mapStubRetrieve = sinon.stub(MapService.location, 'retrieve');


const { makeMockModels } = require('sequelize-test-helpers');

const mockModels = makeMockModels({
    warning: {
        create: sinon.stub(),
        findAll: sinon.stub()
    },
    status: { create: sinon.stub() },
    sequelize: transactionMock,
});

const save = proxyquire('../controllers/WarningController', {
    '../models': mockModels,
});

let result;

const fakeWarning = { dataValues: sinon.stub() };
const fakeWarning2 = { dataValues: sinon.stub() };
const arr = [ fakeWarning,  fakeWarning2];

describe('Warning testing', () => {
    const warning = {
        description: 'test.link/for/test/purposes',
        location: '64.29438, -18.23048',
        categoryId: '7357108'
    };

    const userId = '73574538';

    const resetStubsCreate = () => {
        mockModels.warning.create.resetHistory();
        fakeWarning.dataValues.resetHistory();
    };

    context('testing create() when data is given', () => {
        before(async () => {
            mockModels.warning.create.resolves(fakeWarning);
            result = await save.create(warning, userId);
        });

        after(() => {
            resetStubsCreate();
            mapStub.reset();
            resStub.reset();
        });

        it('called warning.create()', () => {
            expect(mockModels.warning.create).to.have.been.called;
        });

        it('called status.create()', () => {
            expect(mockModels.status.create).to.have.been.called;
        });

        it('called status.create()', () => {
            expect(mapStub).to.have.been.called;
        });

        it('called res.reload()', () => {
            expect(resStub).to.have.been.called;
        });

        it('Checking if the object was created', () => {
            expect(mockModels.warning.create.firstCall.lastArg).to.not.be.undefined;
        });

        it('Check if the returned value is correct', () => {
            expect(result).to.eql(fakeWarning);
        });
    });

    const retWar = {
        offset: 0,
        limit: 10
    };

    const resetStubsRetrieve = () => {
        mockModels.warning.create.resetHistory();
        fakeWarning.dataValues.resetHistory();
    };

    context('testing retrive() when a warning doesnt exist ', () => {
        before(async () => {
            mockModels.warning.findAll.returns([]);
            mapStubRetrieve.resolves([]);
            result = await save.retrieve(retWar, userId);
        });

        after(resetStubsRetrieve);

        it('called category.retrieve()', () => {
            expect(mockModels.warning.findAll).to.have.been.called;
        });

        it('returned value if when no category found', () => {
            expect(result).to.eql([]);
        });
    });

    context('testing retrieve() when only a single warning exist', () => {
        before(async () => {
            mockModels.warning.findAll.returns([fakeWarning]);
            mapStubRetrieve.resolves([1]);
            result = await save.retrieve(retWar, userId);
        });

        after(resetStubsRetrieve);

        it('called category.retrieve()', () => {
            expect(mockModels.warning.findAll).to.have.been.called;
        });

        it('returned the category', () => {
            expect(result).to.eql([fakeWarning.dataValues]);
        });
    });

    context('testing retrieve() when two categories exist', () => {
        before(async () => {
            mockModels.warning.findAll.returns(arr);
            mapStubRetrieve.resolves([1,2]);
            result = await save.retrieve(retWar, userId);
        });

        after( () => {
            resetStubsRetrieve();
            arr.map( fake => fake.dataValues.resetHistory());
        });

        it('called category.retrieve()', () => {
            expect(mockModels.warning.findAll).to.have.been.called;
        });

        it('returned the category', () => {
            expect(result).to.include.members(
                [fakeWarning.dataValues, fakeWarning2.dataValues]
            );
        });
    })
});