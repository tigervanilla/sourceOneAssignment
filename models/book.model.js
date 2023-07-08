const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { BOOK_TYPE } = require('../constants');

let BookSchema = new Schema({
    name: {type: String, required: true, max: 100},
    type: {type: String, enum: Object.values(BOOK_TYPE)},
});


module.exports = mongoose.model('Book', BookSchema);