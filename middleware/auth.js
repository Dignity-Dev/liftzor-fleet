const jwt = require('jsonwebtoken');

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        // If token is not present, redirect to login page
        return res.redirect('/sign-in');
    }

    try {
        // Verify the token
        jwt.verify(token, process.env.SECRET);
        req.user = user; // You may want to store user info here
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        // If token is invalid or expired, redirect to login
        res.redirect('/sign-in');
    }
};

module.exports = isAuthenticated;