const express = require('express');
const router = express.Router();
const axios = require('axios');
const isAuthenticated = require('../middleware/auth'); // Import the middleware
const jwt = require('jsonwebtoken');

// Protected Dashboard Route
router.get('/dashboard', isAuthenticated, async(req, res) => {
    try {
        const token = req.cookies.token;
        const user = jwt.decode(token);

        // Fetch data for the dashboard (orders, drivers, vehicles, customers)
        const [orders, drivers, vehicles, customers] = await Promise.all([
            axios.get(`${process.env.APP_URI}/orders`, { headers: { Authorization: `Bearer ${token}` } }),
            axios.get(`${process.env.APP_URI}/drivers`, { headers: { Authorization: `Bearer ${token}` } }),
            axios.get(`${process.env.APP_URI}/vehicles`, { headers: { Authorization: `Bearer ${token}` } }),
            axios.get(`${process.env.APP_URI}/customers`, { headers: { Authorization: `Bearer ${token}` } })
        ]);

        // Render dashboard with metrics
        res.render('fleet/dashboard', {
            user: { name: user.name, email: user.email, profileImage: user.profileImage },
            metrics: {
                totalOrders: orders.data.length,
                totalDrivers: drivers.data.length,
                totalVehicles: vehicles.data.length,
                totalCustomers: customers.data.length
            }
        });
    } catch (error) {
        res.render('error', { message: 'Error loading dashboard.' });
    }
});

module.exports = router;