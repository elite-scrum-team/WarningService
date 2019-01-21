const proxyquire = require('proxyquire');
const chai = require('chai');
chai.use(require('sinon-chai'));
let expect = chai.expect;
const sinon = require('sinon');
const transactionMock = require('./__mock__/sequelize');
const  res = require('./__mock__/res');

const { makeMockModels } = require('sequelize-test-helpers');

let resStub;

const mockModels = makeMockModels({
    status: { create: sinon.stub() },
    warning: { findByPk: sinon.stub() },
    sequelize: transactionMock
});

const save = proxyquire('../controllers/StatusController', {
    '../models': mockModels,
});

let result;

const fakeStatus = { dataValues: sinon.stub() };

describe('Status testing', () => {
    const status = {
        type: 'unreviewed',
        description: 'A test status',
        warningId: '7357',
    };

    const userId = '73574538';

    const resetStubs = () => {
        mockModels.status.create.resetHistory();
        mockModels.warning.findByPk.resetHistory();
        fakeStatus.dataValues.resetHistory();
    };

    context('testing create() when data is given', () => {
        before(async () => {
            resStub = sinon.stub(res, 'update');
            mockModels.status.create.resolves(fakeStatus);
            mockModels.warning.findByPk.resolves(res);
            result = await save.create(status, userId);
        });

        after( () => {
            resetStubs();
            resStub.restore();
        });

        it('called status.create()', () => {
            expect(mockModels.status.create).to.have.been.called;
        });

        it('called status.create()', () => {
            expect(mockModels.warning.findByPk).to.have.been.called;
        });

        it('Checking if the object was created', () => {
            expect(mockModels.status.create.firstCall.lastArg).to.not.be.undefined;
        });

        it('Check if the returned value is correct', () => {
            expect(result).to.eql(fakeStatus);
        });
    });
});