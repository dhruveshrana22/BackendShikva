const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../modal/users');
const { JWT_SECRET } = require('../constants');

// @desc    Register a new user
exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Create a new user instance
        user = new User({
            name,
            email,
            password
        });

        // Hash password before saving in database
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save(); // Save the user to the database

        // Create and sign the JWT token
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            JWT_SECRET,
            { expiresIn: '1h' }, // Token valid for 1 hour
            (err, token) => {
                if (err) throw err;
                res.json({ token }); // Return the JWT token
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
