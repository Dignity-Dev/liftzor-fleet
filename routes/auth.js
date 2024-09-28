const express = require('express');
const router = express.Router();
const axios = require('axios');
const jwt = require('jsonwebtoken');

// Middleware to protect routes
const authenticateJWT = (req, res, next) => {
    const token = req.cookies.token;
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


// In your auth route
router.post('/sign-in', async(req, res) => {
    try {
        // Authentication logic
        const response = await axios.post(`${process.env.APP_URI}/fleet/login`, req.body);
        const users = response.data;

        // On successful login
        const token = jwt.sign({ id: users.user }, process.env.SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        res.cookie('token', token, { httpOnly: true });
        console.log(token);
        // Pass success message to EJS
        res.render('fleet/sign-in', { success: 'Login successful!', error: null });
    } catch (error) {
        // Handle the error in the route, not in the EJS
        res.render('fleet/sign-in', { success: null, error: 'Login failed. Please check your credentials!' });
    }
});



// Register handler (No bcrypt)
router.post('/sign-up', async(req, res) => {
    try {
        const response = await axios.post(`${process.env.APP_URI}/fleet/register`, req.body);
        res.render('fleet/sign-in', { success: 'Registration successful!', error: null });
    } catch (error) {
        res.render('fleet/regme', { success: null, error: 'Registration failed. Please check your credentials!' });
    }
});

// Logout
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/sign-in');
    console.log(token);
});


module.exports = router;