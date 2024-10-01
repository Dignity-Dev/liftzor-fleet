const express = require('express');
const router = express.Router();
const axios = require('axios');
const jwt = require('jsonwebtoken');


// Middleware to authenticate and protect routes
const isAuthenticated = require('../../middleware/auth'); // Your custom auth middleware

// fetch all

router.get('/manage-customer', async(req, res) => {
    try {
        // const response = await axios.get(`${process.env.APP_URI}/admin/customers`, {
        //     headers: {
        //         Authorization: `Bearer ${req.cookies.token}`
        //     }
        // });
        // const customers = response.data;
        res.render('fleet/customer/customer');
    } catch (error) {
        console.error('Error fetching customers:', error);
        res.render('error', { message: 'Error fetching customers.' });
    }
});


// get one
router.get('/customer/:id', isAuthenticated, async(req, res) => {
    try {
        // await axios.post(`${process.env.APP_URI}/admin/customers`, req.body, {
        //     headers: {
        //         Authorization: `Bearer ${req.cookies.token}`
        //     }
        // });
        res.render('fleet/customer/view-customer');
    } catch (error) {
        res.render('error', { message: 'Error getting a customer.' });
    }
});


// update
// render update form
router.get('/update-customer/:id', isAuthenticated, async(req, res) => {
    try {
        // await axios.post(`${process.env.APP_URI}/admin/customers`, req.body, {
        //     headers: {
        //         Authorization: `Bearer ${req.cookies.token}`
        //     }
        // });
        res.render('fleet/customer/update-customer');
    } catch (error) {
        res.render('error', { message: 'Error updating customer.' });
    }
});


router.patch('/update-customer/:id', isAuthenticated, async(req, res) => {
    try {
        // await axios.patch(`${process.env.APP_URI}/customers/${req.params.id}`, req.body, {
        //     headers: {
        //         Authorization: `Bearer ${req.cookies.token}`
        //     }
        // });
        res.redirect(`/manage-customer`);
    } catch (error) {
        res.render('error', { message: 'Error updating customer.' });
    }
});


// delete
router.delete('/customers/:id', isAuthenticated, async(req, res) => {
    try {
        // await axios.delete(`${process.env.APP_URI}/customers/${req.params.id}`, {
        //     headers: {
        //         Authorization: `Bearer ${req.cookies.token}`
        //     }
        // });
        res.redirect('/manage-customer');
    } catch (error) {
        res.render('error', { message: 'Error deleting customer.' });
    }
});


module.exports = router;