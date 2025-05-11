const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  expenseAmount: {
    type: Number,
    required: true,
  },
  fromWhichAccount: {
    type: String,
    enum: ['cash', 'online'],  // ✅ updated values
    required: true,
  },
  expenseType: {
    type: String,
    enum: [
      'barberCommission',     // ✅ fixed typo
      'productPurchase',
      'rent',
      'electricityBill',
      'equipment',
      'others',
      'dueClearance'
    ],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  notes: {
    type: String,
    default: '',
  },
  barberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Barber',
    required: function () {
      return this.expenseType === 'barberCommission';
    },
  },
});

module.exports = mongoose.model('Expense', ExpenseSchema);
