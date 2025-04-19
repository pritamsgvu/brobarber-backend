const mongoose = require('mongoose');
const TransactionSchema = new mongoose.Schema({
    barberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Barber' },
    date: Date,
    selectedServices: [String],
    selectedProducts: [String],
    serviceAmount: Number,
    totalProductAmount: Number,
    paymentMode: String
});
module.exports = mongoose.model('Transaction', TransactionSchema);
