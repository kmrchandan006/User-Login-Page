const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route to handle login
router.post('/login', authController.loginOrRegister);

// Route to handle registration
router.post('/register', authController.loginOrRegister);

module.exports = router;
