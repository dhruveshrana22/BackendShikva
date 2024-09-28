const express = require('express');
const router = express.Router();
const { register } = require('../controllers/authController');

const user = require('../modal/users');
const auth = require("../middleware/auth");

// @route    GET /api/auth/user
// @desc     Get user data by token
// @access   Private
router.get('/users', async (req, res) => {
    try {
        const users = await user.find(); // Fetch all users from the database
        res.json(users); // Send the user data as a JSON response
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// @route    POST /api/auth/register
// @desc     Register a new user
// @access   Public
router.post('/register', register);

module.exports = router;
