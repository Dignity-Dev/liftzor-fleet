const express = require('express');
const router = express.Router();
const axios = require('axios');
const jwt = require('jsonwebtoken');

// Middleware to protect routes
const authenticateJWT = (req, res, next) => {
    const token = req.cookies.token;
    console.log('Token:', token);
    if (token) {
        jwt.verify(token, process.env.SECRET, (err, user) => {
            if (err) {
                return res.status(403).send('Unauthorized');
            }
            req.user = user;
            next();
        });
    } else {
        res.status(403).send('Unauthorized');
    }
};

// Redirect to dashboard if user is already logged in
router.get('/sign-in', (req, res) => {
    const token = req.cookies.token;
    if (token) {
        // If token exists, redirect to dashboard
        return res.redirect('/dashboard');
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
        const response = await axios.post(`${process.env.APP_URI}/fleet/login`, req.body);
        const users = response.data;
        // On successful login, generate token
        // const token = jwt.sign({ id: users.user }, process.env.SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        const token = jwt.sign({
            id: users.user, // Assuming this is the user ID
            fullName: users.fullName, // Assuming this is the user's full name
            emailAddress: users.emailAddress, // User's email
            passport: users.passport // Assuming this is the user's profile image
        }, process.env.SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        res.cookie('token', token, { httpOnly: true });
        console.log(token);

        // Store some user info in cookies or session (non-sensitive info)
        res.cookie('fullName', users.fullName, { httpOnly: false });
        res.cookie('userEmail', users.emailAddress, { httpOnly: false });


        // Redirect to dashboard with user data
        res.redirect('/dashboard');
    } catch (error) {
        // Handle the error, possibly from invalid credentials
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

module.exports = router;
module.exports = router;