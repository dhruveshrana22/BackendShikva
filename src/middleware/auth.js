const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../constants');

// Middleware to authenticate the user based on JWT
const auth = (req, res, next) => {
    const token = req.header('Authorization'); // Ensure that the token is in the Authorization header

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

module.exports = auth;
