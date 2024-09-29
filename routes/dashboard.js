const express = require('express');
const router = express.Router();
const axios = require('axios');
const jwt = require('jsonwebtoken');

// Middleware to authenticate and protect routes
const isAuthenticated = require('../middleware/auth'); // Your custom auth middleware

router.get('/dashboard', async(req, res) => {
    try {
        const token = req.cookies.token; // Retrieve token from cookies

        if (!token) {
            return res.redirect('/sign-in'); // Redirect to login if no token is found
        }

        // Verify the token to get user info
        const user = jwt.verify(token, process.env.SECRET); // Ensure you are decoding the token properly
        console.log(user);


        // Fetch data for the dashboard by sending requests to your API
        // Pass the token in the Authorization header for authenticated requests
        // const [orders, drivers, vehicles, customers] = await Promise.all([
        //     axios.get(`${process.env.APP_URI}/orders`, { headers: { Authorization: `Bearer ${token}` } }),
        //     axios.get(`${process.env.APP_URI}/drivers`, { headers: { Authorization: `Bearer ${token}` } }),
        //     axios.get(`${process.env.APP_URI}/vehicles`, { headers: { Authorization: `Bearer ${token}` } }),
        //     axios.get(`${process.env.APP_URI}/customers`, { headers: { Authorization: `Bearer ${token}` } })
        // ]);

        // Render the dashboard view, passing user and metrics data to the EJS template
        res.render('fleet/dashboard', {
            user: {
                name: user.fullName,
                email: user.emailAddress,
                profileImage: user.passport
            },
            // metrics: {
            //     totalOrders: orders.data.length, // Total number of orders
            //     totalDrivers: drivers.data.length, // Total number of drivers
            //     totalVehicles: vehicles.data.length, // Total number of vehicles
            //     totalCustomers: customers.data.length // Total number of customers
            // }
        });
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            // Token has expired, clear the cookie and redirect to login
            res.clearCookie('token');
            return res.redirect('/sign-in');
        } else {
            // Handle other errors
            console.error('Error loading dashboard:', error);
            res.render('error', { message: 'Error loading dashboard. Please try again later.' });
        }
    }
});

module.exports = router;