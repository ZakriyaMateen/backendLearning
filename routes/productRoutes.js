const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
//auth middleware import in next line
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/addNewProduct', productController.addNewProduct);

router.get('/getAllProducts',authMiddleware, productController.getAllProducts);
router.get('/getAllProductsAllUsers',authMiddleware, productController.getAllProductsAllUsers);

module.exports = router;
