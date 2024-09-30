const express = require('express');
const router = express.Router();
const axios = require('axios');
const jwt = require('jsonwebtoken');


// Middleware to authenticate and protect routes
const isAuthenticated = require('../middleware/auth'); // Your custom auth middleware
//fetch all
router.get('/customers', isAuthenticated, async(req, res) => {
    try {
        const response = await axios.get(`${process.env.APP_URI}/admin/users`, {
            headers: {
                Authorization: `Bearer ${req.cookies.token}`
            }
        });
        // const customers = response.data;
        res.render('fleet/customer', { customers });
    } catch (error) {
        res.render('error', { message: 'Error fetching customers.' });
    }
});

//create

router.post('/customers', isAuthenticated, async(req, res) => {
    try {
        await axios.post(`${process.env.APP_URI}/customers`, req.body, {
            headers: {
                Authorization: `Bearer ${req.cookies.token}`
            }
        });
        res.redirect('/customers');
    } catch (error) {
        res.render('error', { message: 'Error creating customer.' });
    }
});

//update
router.put('/customers/:id', isAuthenticated, async(req, res) => {
    try {
        await axios.put(`${process.env.APP_URI}/customers/${req.params.id}`, req.body, {
            headers: {
                Authorization: `Bearer ${req.cookies.token}`
            }
        });
        res.redirect('/customers');
    } catch (error) {
        res.render('error', { message: 'Error updating customer.' });
    }
});


// delete
router.delete('/customers/:id', isAuthenticated, async(req, res) => {
    try {
        await axios.delete(`${process.env.APP_URI}/customers/${req.params.id}`, {
            headers: {
                Authorization: `Bearer ${req.cookies.token}`
            }
        });
        res.redirect('/customers');
    } catch (error) {
        res.render('error', { message: 'Error deleting customer.' });
    }
});