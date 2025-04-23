// const express = require('express');
// const router = express.Router();
// const Product = require('../models/Product');

// router.get('/', async (req, res) => {
//     const products = await Product.find();
//     res.json(products);
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products
router.get('/', async (req, res) => {
    const products = await Product.find().populate('services');
    res.json(products);
});

// Add product
router.post('/', async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.json({ message: 'Product added', product });
});

// Update product
router.put('/:id', async (req, res) => {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Product updated', updatedProduct });
});

// Delete product
router.delete('/:id', async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
});

module.exports = router;