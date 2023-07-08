const router = require('express').Router();

const { calculateRent } = require('../core/rentCalculator');

router.get('/', (req,res) => res.send('done2'));

router.post('/', (req,res) => {
    const { lineItems } = req.body;
    const rent = calculateRent(lineItems);
    return res.json({ rent });
});

module.exports = router;