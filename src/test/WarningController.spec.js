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

const mapStubRetrieveOne = sinon.stub(MapService.location, 'retrieveOne');

const resStubToJSON = sinon.stub(res, 'toJSON');

let resStubUpdate;

const { makeMockModels } = require('sequelize-test-helpers');

const mockModels = makeMockModels({
    warning: {
        create: sinon.stub(),
        findAll: sinon.stub(),
        findByPk: sinon.stub(),
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
const arr = [fakeWarning, fakeWarning2];

describe('Warning testing', () => {
    const warning = {
        description: 'test.link/for/test/purposes',
        location: '64.29438, -18.23048',
        categoryId: '7357108',
    };

    const userId = '73574538';

    const resetStubsCreate = () => {
        mockModels.warning.create.resetHistory();
        fakeWarning.dataValues.resetHistory();
        mapStub.restore();
        resStub.restore();
    };

    context('testing create()', () => {
        before(async () => {
            mapStub.resolves('1');
            mockModels.warning.create.resolves(fakeWarning);
            result = await save.create(warning, userId);
        });

        after(resetStubsCreate);

        it('called warning.create()', () => {
            expect(mockModels.warning.create).to.have.been.called;
        });

        it('called status.create()', () => {
            expect(mockModels.status.create).to.have.been.called;
        });

        it('called Mapservice.location.create()', () => {
            expect(mapStub).to.have.been.called;
        });

        it('called res.reload()', () => {
            expect(resStub).to.have.been.called;
        });

        it('Checking if the object was created', () => {
            expect(mockModels.warning.create.firstCall.lastArg).to.not.be
                .undefined;
        });

        it('Check if the returned value is correct', () => {
            expect(result).to.eql(fakeWarning);
        });
    });

    const retWar = {
        offset: 0,
        limit: 10,
    };

    const resetStubsRetrieve = () => {
        mockModels.warning.findAll.resetHistory();
        mapStubRetrieve.reset();
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

        it('called Mapservice.location.create()', () => {
            expect(mapStubRetrieve).to.have.been.called;
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

        it('called Mapservice.location.create()', () => {
            expect(mapStubRetrieve).to.have.been.called;
        });

        it('Check if the returned value is correct', () => {
            expect(result).to.eql([fakeWarning.dataValues]);
        });
    });

    context('testing retrieve() when two categories exist', () => {
        before(async () => {
            mockModels.warning.findAll.returns(arr);
            mapStubRetrieve.resolves([1, 2]);
            result = await save.retrieve(retWar, userId);
        });

        after(() => {
            resetStubsRetrieve();
            arr.map(fake => fake.dataValues.resetHistory());
        });

        it('called category.retrieve()', () => {
            expect(mockModels.warning.findAll).to.have.been.called;
        });

        it('called Mapservice.location.create()', () => {
            expect(mapStubRetrieve).to.have.been.called;
        });

        it('Check if the returned value is correct', () => {
            expect(result).to.include.members(
                [fakeWarning.dataValues, fakeWarning2.dataValues]
            );
        });
    });

    const id = '7357';

    const resetStubsRetrieveOne = () => {
        mockModels.warning.findByPk.resetHistory();
        mapStubRetrieveOne.reset();
        fakeWarning.dataValues.resetHistory();
    };

    context('testing retrieveOne()', () => {
        before(async () => {
            mockModels.warning.findByPk.resolves(fakeWarning);
            mapStubRetrieveOne.resolves('7357108');
            result = await save.retriveOne(id);
        });

        after(resetStubsRetrieveOne);

        it('called warning.findByPK()', () => {
            expect(mockModels.warning.findByPk).to.have.been.called;
        });

        it('called Mapservice.location.retrieveOne()', () => {
            expect(mapStubRetrieveOne).to.have.been.called;
        });

        it('Check if the returned value is correct', () => {
            expect(result).to.eql(fakeWarning.dataValues);
        });
    });

    const resetStubsRetrieveContent = () => {
        mockModels.warning.findByPk.resetHistory();
        fakeWarning.dataValues.resetHistory();
        resStubToJSON.reset();
    };

    context('testing retrieveContent with null', () => {
        before(async () => {
            mockModels.warning.findByPk.resolves(null);
            result = await save.retrieveContent(null);
        });

        after(resetStubsRetrieveContent);

        it('called warning.findByPK()', () => {
            expect(mockModels.warning.findByPk).to.have.been.called;
        });

        it('Check if the returned value is correct', () => {
            expect(result).to.eql('Instance failed');
        });
    });

    context('testing retrieveContent', () => {
        before(async () => {
            mockModels.warning.findByPk.resolves(res);
            resStubToJSON.returns(fakeWarning.dataValues);
            result = await save.retrieveContent(id);
        });

        after(resetStubsRetrieveContent);

        it('called warning.findByPK()', () => {
            expect(mockModels.warning.findByPk).to.have.been.called;
        });

        it('called res.toJSON()', () => {
            expect(resStubToJSON).to.have.been.called;
        });

        it('Check if the returned value is correct', () => {
            expect(result).to.eql([]);
        });
    });

    const resetStubsUpdate = () => {
        mockModels.warning.findByPk.resetHistory();
        fakeWarning.dataValues.resetHistory();
    };

    const value = {value: 'test'};

    context('testing update', () => {
        before(async () => {
            resStubUpdate = sinon.stub(res, 'update');
            mockModels.warning.findByPk.resolves(res);
            resStubUpdate.resolves('updated');
            result = await save.update(id, value);
        });

        after(() => {
            resetStubsUpdate();
            resStubUpdate.restore();
        });

        it('Check if the returned value is correct', () => {
            expect(result).to.eql('updated');
        })
    });
});
