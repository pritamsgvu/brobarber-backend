const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const Transaction = require('../models/Transaction');


// Create a new expense
router.post('/', async (req, res) => {
  try {
    const expense = new Expense(req.body);
    const savedExpense = await expense.save();
    res.status(201).json(savedExpense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Get all expenses
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Optional: Get expenses by date range or type (add filters as needed)
router.get('/filter', async (req, res) => {
  try {
    const { fromDate, toDate, type } = req.query;
    const filter = {};

    if (fromDate && toDate) {
      filter.date = { $gte: new Date(fromDate), $lte: new Date(toDate) };
    }

    if (type) {
      filter.expenseType = type;
    }

    const expenses = await Expense.find(filter);
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedExpense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    res.json(updatedExpense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
// DELETE a barber by ID
router.delete('/:id', async (req, res) => {
  try {
    const expences = await Expense.findByIdAndDelete(req.params.id);

    if (!expences) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/earnings-report', async (req, res) => {
  try {
    const { year } = req.query;
    const yearFilter = year ? parseInt(year) : null;

    const matchStage = yearFilter
      ? { $match: { date: { $gte: new Date(`${year}-01-01`), $lte: new Date(`${year}-12-31`) } } }
      : { $match: {} };

    const earnings = await Transaction.aggregate([
      matchStage,
      {
        $group: {
          _id: { year: { $year: "$date" }, month: { $month: "$date" } },
          totalEarnings: { $sum: "$netTotal" }
        }
      },
      {
        $project: {
          year: "$_id.year",
          month: "$_id.month",
          totalEarnings: 1,
          _id: 0
        }
      }
    ]);

    const expenses = await Expense.aggregate([
      matchStage,
      {
        $group: {
          _id: { year: { $year: "$date" }, month: { $month: "$date" } },
          totalExpenses: { $sum: "$expenseAmount" }
        }
      },
      {
        $project: {
          year: "$_id.year",
          month: "$_id.month",
          totalExpenses: 1,
          _id: 0
        }
      }
    ]);

    const report = earnings.map(e => {
      const exp = expenses.find(x => x.year === e.year && x.month === e.month);
      return {
        year: e.year,
        month: e.month,
        totalEarnings: e.totalEarnings,
        totalExpenses: exp ? exp.totalExpenses : 0,
        netProfit: e.totalEarnings - (exp ? exp.totalExpenses : 0)
      };
    });

    // Get all available years from transactions
    const years = await Transaction.aggregate([
      {
        $group: {
          _id: { year: { $year: "$date" } }
        }
      },
      {
        $project: { year: "$_id.year", _id: 0 }
      },
      { $sort: { year: -1 } }
    ]);

    const availableYears = years.map(y => y.year);

    res.json({ report, availableYears });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});


module.exports = router;
