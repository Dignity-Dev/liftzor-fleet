const express = require('express');
const router = express.Router();
const axios = require('axios');



// Login page
router.get('/login', (req, res) => {
    res.render('fleet/sign-in', { error: null });
});

// Register page
router.get('/register', (req, res) => {
    res.render('fleet/register', { error: null });
});

// Login handler
router.post('/login', async(req, res) => {
    const { email, password } = req.body;
    try {
        const response = await axios.post(`${process.env.APP_URI}/user/login`, { email, password });
        req.session.user = response.data;
        res.redirect('fleet/dashboard');
    } catch (error) {
        res.render('fleet/sign-in', { error: 'Invalid credentials' });
    }
});

// Register handler
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
    req.session.destroy();
    res.redirect('/auth/login');
});

module.exports = router;