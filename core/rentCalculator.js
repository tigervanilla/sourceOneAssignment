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
        switch (book.type) {
            case BOOK_TYPE.FICTION:
                rent += (duration * RENTAL.FICTION);
                break;
            case BOOK_TYPE.NOVEL:
                rent += (duration * RENTAL.NOVEL);
                break;
            case BOOK_TYPE.REGULAR:
                rent += (duration * RENTAL.REGULAR);
                break;
        }
    }

    return rent;
}

module.exports = { calculateRent };