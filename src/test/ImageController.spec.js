const proxyquire = require('proxyquire');
const chai = require('chai');
chai.use(require('sinon-chai'));
let expect = chai.expect;
const sinon = require('sinon');

const { makeMockModels } = require('sequelize-test-helpers');

const mockModels = makeMockModels({
    image: { create: sinon.stub() },
});

const save = proxyquire('../controllers/ImageController', {
    '../models': mockModels,
});

let result;

const fakeImage = { dataValues: sinon.stub() };

describe('User testing', () => {
    const image = {
        warningId: '7357',
        fileURL: 'test.link/for/test/purposes',
    };

    const resetStubs = () => {
        mockModels.image.create.resetHistory();
        fakeImage.dataValues.resetHistory();
    };

    context('testing create() when data is given', () => {
        before(async () => {
            mockModels.image.create.resolves(fakeImage);
            console.log(image.fileURL);
            result = await save.create(image);
        });

        after(resetStubs);

        it('called image.create()', () => {
            expect(mockModels.image.create).to.have.been.called;
        });

        it('Checking if the object was created', () => {
            expect(mockModels.image.create.firstCall.lastArg).to.not.be.undefined;
        });

        it('Check if the returned value is correct', () => {
            expect(result).to.eql(fakeImage.dataValues);
        });
    });
});