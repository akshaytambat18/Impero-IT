const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// Route to handle user registration
router.post('/register', UserController.registerUser);

// Route to handle user login
router.post('/login', UserController.loginUser);

module.exports = router;
