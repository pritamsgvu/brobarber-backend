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


router.get('/monthly-payment-summary', async (req, res) => {
    try {
      const { fromDate, toDate } = req.query;
  
      if (!fromDate || !toDate) {
        return res.status(400).json({ message: 'Missing fromDate or toDate' });
      }
  
      const from = new Date(fromDate);
      const to = new Date(toDate);
  
      const transactions = await Transaction.find({
        date: { $gte: from, $lte: to }
      });
  
      let totalCashReceived = 0;
      let totalOnlineReceived = 0;
  
      transactions.forEach(t => {
        if (t.paymentMode === 'cash') {
          totalCashReceived += (t.netTotal || 0) + (t.totalProductAmount || 0);
        } else if (t.paymentMode === 'online') {
          totalOnlineReceived += (t.netTotal || 0) + (t.totalProductAmount || 0);
        } else if (t.paymentMode === 'both') {
          totalCashReceived += t.cashAmount || 0;
          totalOnlineReceived += t.onlineAmount || 0;
        }
      });
  
      res.json({
        totalCashReceived,
        totalOnlineReceived
      });
    } catch (err) {
      console.error('Error in /monthly-payment-summary:', err);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

module.exports = router;
