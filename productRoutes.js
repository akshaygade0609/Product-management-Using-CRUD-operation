const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Create a new product
router.post('/product', async (req, res) => {
    try {
        const { name, price, description, variants, category, seoTitle, seoDescription } = req.body;
        const product = new Product({
            name,
            price,
            description,
            variants,
            category,
            seoTitle,
            seoDescription
        });
        await product.save();
        res.status(201).send(product);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// List all products
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find({ isArchived: false });
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Update a product
router.put('/product/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).send('Product not found');

        const updates = req.body;
        Object.assign(product, updates);

        await product.save();
        res.status(200).send(product);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Delete (archive) a product
router.delete('/product/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).send('Product not found');

        product.isArchived = true;
        await product.save();

        res.send({ message: 'Product archived successfully!' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;
