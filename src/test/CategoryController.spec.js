const proxyquire = require('proxyquire');
const chai = require('chai');
chai.use(require('sinon-chai'));
let expect = chai.expect;
const sinon = require('sinon');

const { makeMockModels } = require('sequelize-test-helpers');

const mockModels = makeMockModels({
    category: { findAll: sinon.stub() },
});

const save = proxyquire('../controllers/CategoryController', {
    '../models': mockModels,
});
let result;

const fakeCategory = { dataValues: sinon.stub() };
const fakeCategory2 = { dataValues: sinon.stub() };
const arr = [fakeCategory, fakeCategory2];

describe('Category testing', () => {
    const resetStubs = () => {
        mockModels.category.findAll.resetHistory();
        fakeCategory.dataValues.resetHistory();
    };

    context('testing retrive() when a category doesnt exist ', () => {
        before(async () => {
            mockModels.category.findAll.resolves([]);
            result = await save.retrive();
        });

        after(resetStubs);

        it('called category.retrieve()', () => {
            expect(mockModels.category.findAll).to.have.been.called;
        });

        it('returned value if when no category found', () => {
            expect(result).to.eql([]);
        });
    });

    context('testing retrieve() when only a single category exist', () => {
        before(async () => {
            mockModels.category.findAll.resolves([fakeCategory]);
            result = await save.retrive();
        });

        after(resetStubs);

        it('called category.retrieve()', () => {
            expect(mockModels.category.findAll).to.have.been.called;
        });

        it('returned the category', () => {
            expect(result).to.eql([fakeCategory.dataValues]);
        });
    });

    context('testing retrieve() when two categories exist', () => {
        before(async () => {
            mockModels.category.findAll.resolves(arr);
            result = await save.retrive();
        });

        after(() => {
            resetStubs();
            arr.map(fake => fake.dataValues.resetHistory());
        });

        it('called category.retrieve()', () => {
            expect(mockModels.category.findAll).to.have.been.called;
        });

        it('returned the category', () => {
            expect(result).to.include.members([
                fakeCategory.dataValues,
                fakeCategory2.dataValues,
            ]);
        });
    });
});
