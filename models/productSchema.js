const mongoose = require('mongoose');
const { use } = require('..');

const productSchema = new mongoose.Schema({
//no Image
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;