const { ObjectId } = require('mongodb');
const { RENTAL, BOOK_TYPE } = require('../constants/index');
const bookModel = require('../models/book.model');

async function calculateRent(lineItems) {
    let bookIds = [];
    let bookDurationObj = {};

    lineItems.forEach(book => {
        bookIds.push(new ObjectId(book._id));
        bookDurationObj[book._id] = book.duration;
    });

    const booksFromDB = await bookModel.find({ _id: { $in: bookIds } });

    if (booksFromDB.length !== bookIds.length) {
        return "Some books not found";
    }

    let rent = 0;

    for (let book of booksFromDB) {
        const duration = bookDurationObj[book._id.toString()];
        if (duration === 0) continue;

        let minimumRent = 0;
        let residualDuration = 0;
        let perDayRental = 0;

        switch (book.type) {
            case BOOK_TYPE.FICTION:
                minimumRent = RENTAL.FICTION.MINIMUM_RENT;
                residualDuration = Math.max(0, duration - RENTAL.FICTION.MINIMUM_DURATION);
                perDayRental = RENTAL.FICTION.PER_DAY;
                break;
            case BOOK_TYPE.NOVEL:
                minimumRent = RENTAL.NOVEL.MINIMUM_RENT;
                residualDuration = Math.max(0, duration - RENTAL.NOVEL.MINIMUM_DURATION);
                perDayRental = RENTAL.NOVEL.PER_DAY;
                break;
            case BOOK_TYPE.REGULAR:
                minimumRent = RENTAL.REGULAR.MINIMUM_RENT;
                residualDuration = Math.max(0, duration - RENTAL.REGULAR.MINIMUM_DURATION);
                perDayRental = RENTAL.REGULAR.PER_DAY;
                break;
        }

        rent = rent + minimumRent + residualDuration * perDayRental;
    }
    
    return rent;
}

module.exports = { calculateRent };