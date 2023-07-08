const { RENTAL } = require('../constants/index');

function calculateRent(lineItems) {
    return lineItems.reduce((prev,curr) => prev + curr.duration*RENTAL, 0);
}

module.exports = { calculateRent };