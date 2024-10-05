const jwt = require('jsonwebtoken');

// Middleware to check if the user is authenticated
const authMiddleware = (req, res, next) => {
    const token = req.cookies.token; // Get the token from cookies

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // Verify the token and extract user details
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded; // Attach user details to req object

        // You can access req.user in your routes (e.g., req.user.fullName, req.user.emailAddress)
        next(); // Move to the next middleware or route handler
    } catch (error) {
        return res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = authMiddleware;
