const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
//auth middleware import in next line
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/addNewOrder',authMiddleware, orderController.addNewOrder);
router.get('/getAllOrders', orderController.getAllOrders);




module.exports = router;
