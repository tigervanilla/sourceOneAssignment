const BOOK_TYPE = {
    FICTION: 'fiction',
    NOVEL: 'novel',
    REGULAR: 'regular',
}

const RENTAL = {
    FICTION: { MINIMUM_DURATION: 0, MINIMUM_RENT: 0, PER_DAY: 3 },
    NOVEL: { MINIMUM_DURATION: 3, MINIMUM_RENT: 4.5, PER_DAY: 1.5 },
    REGULAR: { MINIMUM_DURATION: 2, MINIMUM_RENT: 2, PER_DAY: 1.5 }
}

module.exports = { BOOK_TYPE, RENTAL };