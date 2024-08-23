const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route to handle login
router.post('/login', authController.loginOrRegister);

// Route to handle registration
router.post('/register', authController.loginOrRegister);

// Route to fetch all users
router.get('/users', authController.getAllUsers);



module.exports = router;
