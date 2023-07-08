const { expect } = require('chai');
const sinon = require('sinon');
const { calculateRent } = require('../core/rentCalculator');
const { RENTAL, BOOK_TYPE } = require('../constants/index')
const bookModel = require('../models/book.model');

describe('calculateRent', () => {
  let bookModelStub = sinon.stub(bookModel);
  let lineItems;
  let books;

  beforeEach(() => {
    books = [
      { _id: '64a5ad4212a9f6ccecbd46ca', type: BOOK_TYPE.FICTION },
      { _id: '64a5ad4212a9f6ccecbd46cb', type: BOOK_TYPE.NOVEL },
      { _id: '64a5ad4212a9f6ccecbd46cc', type: BOOK_TYPE.REGULAR }
    ];

    lineItems = [
      { _id: '64a5ad4212a9f6ccecbd46ca', duration: 2 },
      { _id: '64a5ad4212a9f6ccecbd46cb', duration: 3 },
      { _id: '64a5ad4212a9f6ccecbd46cc', duration: 4 }
    ];

  });

  it('should return the correct rent for the given line items', async function () {
    bookModelStub.find.resolves(books);
    const expectedRent = (2 * RENTAL.FICTION) + (3 * RENTAL.NOVEL) + (4 * RENTAL.REGULAR);

    const rent = await calculateRent(lineItems);
    expect(rent).to.equal(expectedRent);
  });

  it('should return "Some books not found" if some of the books are not in the database', async function () {
    bookModelStub.find.resolves([]);
    const expectedRent = "Some books not found"

    const rent = await calculateRent(lineItems);
    expect(rent).to.equal(expectedRent);
  });

  it('should return 0 for an empty line item array', async () => {
    bookModelStub.find.resolves([]);
    const expectedRent = 0;

    const rent = await calculateRent([]);
    expect(rent).to.equal(expectedRent);
  });

  it('should return 0 for line items with zero durations', async () => {
    const lineItems2 = lineItems.map(li => ({ ...li, duration: 0 }));
    bookModelStub.find.resolves(books);
    const expectedRent = 0;

    const rent = await calculateRent(lineItems2);
    expect(rent).to.equal(expectedRent);
  });
});
