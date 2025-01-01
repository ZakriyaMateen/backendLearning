const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
//auth middleware import in next line
const authMiddleware = require('../middlewares/authMiddleware');
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/allUsers',authMiddleware, authController.getAllUsers);

module.exports = router;
