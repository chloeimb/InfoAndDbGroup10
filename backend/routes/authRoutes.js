const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/authController');

// POST route for user login
router.post('/login', loginUser);

module.exports = router;
