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

// Login page
router.get('/sign-in', (req, res) => {
    res.render('fleet/sign-in', { error: null });
});

// Register page
router.get('/register', (req, res) => {
    res.render('fleet/register', { error: null });
});

// Login handler (No bcrypt)
router.post('/login', async(req, res) => {
    const { user, password } = req.body;
    try {
        const response = await axios.post(`${process.env.APP_URI}/user/login`, { user, password });
        const users = response.data;

        // Generate JWT token
        const token = jwt.sign({ id: users.id, email: users.emailAddress }, process.env.SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

        // Set the token in cookies
        res.cookie('token', token, { httpOnly: true });

        // Redirect to dashboard with success message
        res.render('fleet/sign-in', { success: 'Login successful!' });
    } catch (error) {
        // Send error message to frontend if login fails
        res.render('fleet/sign-in', { error: 'Invalid credentials, please try again!' });
    }
});


// Register handler (No bcrypt)
router.post('/register', async(req, res) => {
    const { email, password, name } = req.body;
    try {
        await axios.post(`${process.env.APP_URI}/admin/customers`, { email, password, name });
        res.redirect('/auth/login');
    } catch (error) {
        res.render('auth/register', { error: 'Error registering user' });
    }
});

// Logout
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/auth/login');
});

module.exports = router;