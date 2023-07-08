const router = require('express').Router();
const bookModel = require('../models/book.model');

const { calculateRent } = require('../core/rentCalculator');

router.get('/', (req, res) => res.send('done2'));

router.post('/', async (req, res) => {
    const { lineItems } = req.body;
    const rent = await calculateRent(lineItems);
    return res.json({ rent });
});

module.exports = router;