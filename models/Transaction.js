const mongoose = require('mongoose');
const TransactionSchema = new mongoose.Schema({
    barberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Barber' },
    date: Date,
    selectedServices: [String],
    selectedProducts: [String],
    serviceAmount: Number,
    totalProductAmount: Number,
    discount: Number,
    netTotal: Number,
    paymentMode: String,
    customerName: { type: String, default: null },
    mobileNumber: { type: String, default: null },
    createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Transaction', TransactionSchema);
