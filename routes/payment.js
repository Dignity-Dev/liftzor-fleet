const express = require('express');
const router = express.Router();
const axios = require('axios');
const jwt = require('jsonwebtoken');


// Middleware to authenticate and protect routes
const isAuthenticated = require('../middleware/auth'); // Your custom auth middleware
// Get all payments
router.get('/payments', isAuthenticated, async(req, res) => {
    try {
        const response = await axios.get(`${process.env.APP_URI}/payments`, {
            headers: {
                Authorization: `Bearer ${req.cookies.token}`
            }
        });
        const payments = response.data;
        res.render('payments/index', { payments });
    } catch (error) {
        res.render('error', { message: 'Error fetching payments.' });
    }
});