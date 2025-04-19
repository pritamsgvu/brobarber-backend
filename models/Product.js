const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    productName: String,
    brand: String,
    productPrice: Number,
    perUsePrice: Number
});
module.exports = mongoose.model('Product', ProductSchema);
