const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { userValidationSchema } = require('../middleware/uservalidation');
const joiValidator = require('../utility/joiValidator');

// Route to handle login
router.post('/login', authController.loginOrRegister);

// Route to handle registration
router.post('/register', joiValidator(userValidationSchema),authController.loginOrRegister);

// Route to fetch all users
router.get('/users', authController.getAllUsers);

 
module.exports = router;
