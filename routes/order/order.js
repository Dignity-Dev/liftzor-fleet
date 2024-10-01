const express = require('express');
const router = express.Router();
const axios = require('axios');
const jwt = require('jsonwebtoken');


// Middleware to authenticate and protect routes
const isAuthenticated = require('../../middleware/auth'); // Your custom auth middleware

// fetch all
router.get('/manage-order', isAuthenticated, async(req, res) => {
    try {
        // const response = await axios.get(`${process.env.APP_URI}/admin/orders`, {
        //     headers: {
        //         Authorization: `Bearer ${req.cookies.token}`
        //     }
        // });
        // const orders = response.data;
        res.render('fleet/order/order');
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.render('error', { message: 'Error fetching orders.' });
    }
});

// fetch new order
router.get('/new-order', isAuthenticated, async(req, res) => {
    try {
        // const response = await axios.get(`${process.env.APP_URI}/admin/orders`, {
        //     headers: {
        //         Authorization: `Bearer ${req.cookies.token}`
        //     }
        // });
        // const orders = response.data;
        res.render('fleet/order/new-order');
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.render('error', { message: 'Error fetching orders.' });
    }
});


//assign order
router.post('/assigned-order', isAuthenticated, async(req, res) => {
    try {
        // await axios.post(`${process.env.APP_URI}/admin/order`, req.body, {
        //     headers: {
        //         Authorization: `Bearer ${req.cookies.token}`
        //     }
        // });
        res.redirect('/manage-order');
    } catch (error) {
        res.render('error', { message: 'Error assigning order.' });
    }
});


// get one
router.get('/order/:id', isAuthenticated, async(req, res) => {
    try {
        // await axios.post(`${process.env.APP_URI}/admin/orders`, req.body, {
        //     headers: {
        //         Authorization: `Bearer ${req.cookies.token}`
        //     }
        // });
        res.render('fleet/order/view-order');
    } catch (error) {
        res.render('error', { message: 'Error getting a order.' });
    }
});


module.exports = router;