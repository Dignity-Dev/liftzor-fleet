const axios = require('axios');
const jwt = require('jsonwebtoken');


// Render Sign-in Page F
exports.renderSignIn = (req, res) => {
    res.render('fleet/sign-in', { error: null });
};

// Handle Login Function
exports.signin = async(req, res) => {
    try {
        // Send POST request to the login API
        const response = await axios.post(`${process.env.APP_URI}/user/login`, req.body);

        // Extract the accessToken from the response data
        const accessToken = response.data.data.accessToken;

        // Decode the JWT token to get user info
        const decodedToken = jwt.decode(accessToken);
        console.log('Decoded Token:', decodedToken);

        // You can access user info like this:
        const userInfo = {
            id: decodedToken.userID,
            fullName: decodedToken.fullName,
            issuedAt: new Date(decodedToken.iat * 1000),
            expiresAt: new Date(decodedToken.exp * 1000)
        };

        // Log user info for debugging purposes
        console.log('User Info:', userInfo);


        res.cookie('token', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000
        });

        // Redirect to the dashboard
        return res.redirect('/dashboard');

    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);

        const errorMessage = (error.response && error.response.data && error.response.data.message) ?
            error.response.data.message :
            'Login failed';

        return res.status(401).json({
            success: false,
            message: errorMessage
        });
    }
};

// render signup page
exports.renderSignUp = (req, res) => {
    res.render('fleet/regme', { error: null });
};


// Handle Signup Function

exports.signup = async(req, res) => {
    try {
        // Log the request body for debugging purposes
        console.log('Request Body:', req.body);

        // Send POST request to the signup API
        const response = await axios.post(`${process.env.APP_URI}/fleet/register`, req.body);

        // Log the full API response
        console.log('API Response:', response.data);

        // Check if the response indicates a successful registration
        if (response.data.status_code !== 200) {
            throw new Error('Registration was not successful');
        }

        // If no access token is provided, inform the user
        if (!response.data.data || !response.data.data.accessToken) {
            console.warn('No access token returned from the signup API. Redirecting to login page.');
            return res.redirect('/sign-in'); // Redirect to the login page
        }

        // Extract the accessToken from the response data (if available)
        const accessToken = response.data.data.accessToken;

        // Decode the JWT token to get user info (if applicable)
        const decodedToken = jwt.decode(accessToken);
        console.log('Decoded Token:', decodedToken);

        // You can access user info like this (if applicable)
        const userInfo = {
            id: decodedToken.userID, // Adjust based on your token payload
            fullName: decodedToken.fullName,
            issuedAt: new Date(decodedToken.iat * 1000),
            expiresAt: new Date(decodedToken.exp * 1000)
        };

        // Log user info for debugging purposes
        console.log('User Info:', userInfo);

        // Set the signed token as a cookie (if applicable)
        res.cookie('token', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000 // Cookie valid for 1 day
        });

        // Redirect to the dashboard or any other page
        return res.redirect('/dashboard');

    } catch (error) {
        // Log the complete error response for better debugging
        console.error('Error:', error.response ? error.response.data : error.message);

        const errorMessage = (error.response && error.response.data && error.response.data.message) ?
            error.response.data.message :
            'Signup failed';

        return res.status(400).json({
            success: false,
            message: errorMessage
        });
    }
};


// Logout Route
exports.signOut = (req, res) => {
    res.clearCookie('token');
    res.redirect('/sign-in');
    console.log('User logged out');
};
