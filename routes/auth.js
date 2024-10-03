const express = require('express');
const router = express.Router();
const axios = require('axios');
const jwt = require('jsonwebtoken');

// Middleware to authenticate and protect routes
const isAuthenticated = require('../utils/middleware/auth'); // Your custom auth middleware

// Check if token is expired
const isTokenExpired = (token) => {
    if (!token) return true; // If there's no token, it's considered expired
    const decoded = jwt.decode(token); // Decode the token to check its expiration
    return decoded.exp * 1000 < Date.now(); // Check if the expiration time has passed
};

// Redirect to dashboard if user is already logged in
router.get('/sign-in', (req, res) => {
    const token = req.cookies.token;
    const redirectPath = req.query.redirect || '/dashboard'; // Dynamic path, defaults to '/dashboard'

    if (token && !isTokenExpired(token)) {
        // If token exists and is not expired, redirect to the specified page
        return res.redirect(redirectPath);
    }

    // If not logged in, render the login page
    res.render('fleet/sign-in', { success: null, error: null });
});

// Register page
router.get('/sign-up', (req, res) => {
    res.render('fleet/regme', { error: null });
});

// Handle Login
router.post('/sign-in', async(req, res) => {
    try {
        // Authentication logic
        const response = await axios.post(`${process.env.APP_URI}/user/login`, req.body);
        const users = response.data;

        // On successful login, generate token
        const token = jwt.sign({
            id: users.userID,
            fullName: users.fullName,
            emailAddress: users.emailAddress,
            passport: users.passport
        }, process.env.SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

        // Store token in a httpOnly cookie for security
        res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000 }); // 1 day expiry

        // Store non-sensitive user info in regular cookies
        res.cookie('id', users.id, { httpOnly: false, maxAge: 24 * 60 * 60 * 1000 });
        res.cookie('fullName', users.fullName, { httpOnly: false, maxAge: 24 * 60 * 60 * 1000 });
        res.cookie('userEmail', users.emailAddress, { httpOnly: false, maxAge: 24 * 60 * 60 * 1000 });

        // Redirect to dashboard after login
        res.redirect('/dashboard');
    } catch (error) {
        console.error(error);
        res.render('fleet/sign-in', { success: null, error: 'Login failed. Please check your credentials!' });
    }
});


// Handle Registration
router.post('/sign-up', async(req, res) => {
    try {
        const response = await axios.post(`${process.env.APP_URI}/fleet/register`, req.body);
        res.render('fleet/sign-in', { success: 'Registration successful! Please log in.', error: null });
    } catch (error) {
        res.render('fleet/regme', { success: null, error: 'Registration failed. Please try again.' });
    }
});

// Logout Route
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/sign-in');
    console.log('User logged out');
});

// Middleware to check token expiration before accessing protected routes
router.use(isAuthenticated); // Use your existing authentication middleware here

module.exports = router;
