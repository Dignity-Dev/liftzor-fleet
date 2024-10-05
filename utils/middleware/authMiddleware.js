const jwt = require('jsonwebtoken');

const authorize = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            console.log('No token found');
            return res.status(401).json({ message: 'Authorization token is missing' });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded token:', decodedToken);

        if (decodedToken.userType !== 'admin' && decodedToken.userType !== 'fleet') {
            console.log('Access denied due to insufficient permissions');
            return res.status(403).json({ message: 'Access denied: Insufficient permissions' });
        }

        req.user = decodedToken;
        next();
    } catch (error) {
        console.log('Invalid or expired token:', error.message);
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};


module.exports = authorize;