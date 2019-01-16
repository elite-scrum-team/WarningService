const proxyquire = require('proxyquire');
const chai = require('chai');
chai.use(require('sinon-chai'));
let expect = chai.expect;
const sinon = require('sinon');

const { makeMockModels } = require('sequelize-test-helpers');

const mockModels = makeMockModels({
    status: { create: sinon.stub() },
});

const save = proxyquire('../controllers/StatusController', {
    '../models': mockModels,
});

let result;

const fakeStatus = { dataValues: sinon.stub() };

describe('User testing', () => {
    const status = {
        type: 'unreviewed',
        description: 'A test status',
        warningId: '7357',
        userId: '73574538'
    };

    const resetStubs = () => {
        mockModels.status.create.resetHistory();
        fakeStatus.dataValues.resetHistory();
    };

    context('testing create() when data is given', () => {
        before(async () => {
            mockModels.status.create.resolves(fakeStatus);
            result = await save.create(status.type, status.description, status.warningId, status.userId);
        });

        after(resetStubs);

        it('called status.create()', () => {
            expect(mockModels.status.create).to.have.been.called;
        });

        it('Checking if the object was created', () => {
            expect(mockModels.status.create.firstCall.lastArg).to.not.be.undefined;
        });

        it('Check if the returned value is correct', () => {
            expect(result).to.eql(fakeStatus.dataValues);
        });
    });
});