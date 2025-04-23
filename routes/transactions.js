const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// CREATE a new transaction
router.post('/', async (req, res) => {
    try {
        const transaction = new Transaction(req.body);
        await transaction.save();
        res.json(transaction);
    } catch (error) {
        console.error('Error creating transaction:', error);
        res.status(500).json({ error: 'Failed to create transaction' });
    }
});

// GET transactions with pagination and optional filters
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        const fromDate = req.query.fromDate;
        const toDate = req.query.toDate;
        const barberId = req.query.barber;

        const query = {};

        if (fromDate && toDate) {
            query.date = {
                $gte: new Date(fromDate),
                $lte: new Date(toDate)
            };
        }

        if (barberId) {
            query.barberId = barberId;
        }

        const skip = (page - 1) * pageSize;

        const transactions = await Transaction.find(query)
            .populate('barberId')
            .sort({ date: -1 })
            .skip(skip)
            .limit(pageSize);

        res.json(transactions);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ error: 'Failed to fetch transactions' });
    }
});

// DELETE a transaction by ID
router.delete('/:id', async (req, res) => {
    try {
        await Transaction.findByIdAndDelete(req.params.id);
        res.json({ message: 'Transaction deleted' });
    } catch (error) {
        console.error('Error deleting transaction:', error);
        res.status(500).json({ error: 'Failed to delete transaction' });
    }
});

module.exports = router;
