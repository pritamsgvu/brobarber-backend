const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  productName: String,
  brand: String,
  productPrice: Number,
  perUsePrice: Number,
  serviceCharge: Number,
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }]
});

module.exports = mongoose.model('Product', ProductSchema);
