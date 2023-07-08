const { expect } = require('chai');

const { calculateRent } = require('../core/rentCalculator');


describe('calculateRent', () => {
  it('should calculate rental charges for line items', () => {
    const lineItems = [
      { name: 'let us c', duration: 5 },
      { name: 'head first javascript', duration: 3 },
      { name: 'head first python', duration: 7 },
    ];
    const result = calculateRent(lineItems);
    expect(result).to.equal(15);
  });

  it('should return 0 for an empty line item array', () => {
    const result = calculateRent([]);
    expect(result).to.equal(0);
  });

  it('should return 0 for line items with zero durations', () => {
    const lineItems = [
        { name: 'let us c', duration: 0 },
        { name: 'head first javascript', duration: 0 },
        { name: 'head first python', duration: 0 },
    ];
    const result = calculateRent(lineItems);
    expect(result).to.equal(0);
  });
});
