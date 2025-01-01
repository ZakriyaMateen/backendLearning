const Product = require('../models/productSchema.js');
const total = require('../Utils/totalAmount.js');

const addNewProduct = async (req, res) => {
        try{
            const {name, price, description, category} = req.body;
            const newProduct = new Product({
                name,
                price,
                description,
                category,
                user: req.user.id
            });
            await newProduct.save();
            res.status(201).json(newProduct);
        }
        catch(err){
            console.error(err);
            res.status(500).json({message: 'Server error'});
        }
}


// Get all products for a specific user
const getAllProducts = async (req, res) => {
    const userId = req.user.id; // Assuming the user ID is passed as a query parameter
    console.log(userId);

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        const products = await Product.find({ user: userId });
        res.status(200).json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

const getAllProductsAllUsers = async (req, res) => {
    const userId = req.user.id; // Assuming the user ID is passed as a query parameter
        console.log(userId);
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        const products = await Product.find().populate('user', 'username email');
        res.status(200).json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}
module.exports = {
    addNewProduct,
    getAllProducts,
    getAllProductsAllUsers
};