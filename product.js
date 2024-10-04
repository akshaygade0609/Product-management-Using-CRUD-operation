const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
    color: String,
    size: String,
    price: Number,
    stockLevel: Number
});

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String },
    variants: [variantSchema],
    stockQuantity: { type: Number, default: 0 },
    category: { type: String },
    seoTitle: { type: String },
    seoDescription: { type: String },
    isArchived: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
