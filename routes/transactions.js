const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

router.post('/', async (req, res) => {
    const transaction = new Transaction(req.body);
    await transaction.save();
    res.json(transaction);
});

router.get('/', async (req, res) => {
    const transactions = await Transaction.find().populate('barberId');
    res.json(transactions);
});

module.exports = router;
