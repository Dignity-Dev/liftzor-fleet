const express = require('express');
const router = express.Router();
const axios = require('axios');
const jwt = require('jsonwebtoken');


// Middleware to authenticate and protect routes
const isAuthenticated = require('../../middleware/auth'); // Your custom auth middleware

// fetch all
router.get('/manage-vehicle', isAuthenticated, async(req, res) => {
    try {
        // const response = await axios.get(`${process.env.APP_URI}/admin/vehicle`, {
        //     headers: {
        //         Authorization: `Bearer ${req.cookies.token}`
        //     }
        // });
        // const vehicle = response.data;
        res.render('fleet/vehicle/vehicle');
    } catch (error) {
        console.error('Error fetching vehicle:', error);
        res.render('error', { message: 'Error fetching vehicle.' });
    }
});


// create new
router.get('/new-vehicle', isAuthenticated, async(req, res) => {
    try {
        // await axios.post(`${process.env.APP_URI}/admin/vehicle`, req.body, {
        //     headers: {
        //         Authorization: `Bearer ${req.cookies.token}`
        //     }
        // });
        res.render('fleet/vehicle/new-vehicle');
    } catch (error) {
        res.render('error', { message: 'Error creating vehicle.' });
    }
});

// get one
router.get('/vehicle/:id', isAuthenticated, async(req, res) => {
    try {
        // await axios.post(`${process.env.APP_URI}/admin/vehicle`, req.body, {
        //     headers: {
        //         Authorization: `Bearer ${req.cookies.token}`
        //     }
        // });
        res.render('fleet/vehicle/view-vehicle');
    } catch (error) {
        res.render('error', { message: 'Error getting a vehicle.' });
    }
});


// update
// render update form
router.get('/update-vehicle/:id', isAuthenticated, async(req, res) => {
    try {
        // await axios.post(`${process.env.APP_URI}/admin/vehicle`, req.body, {
        //     headers: {
        //         Authorization: `Bearer ${req.cookies.token}`
        //     }
        // });
        res.render('fleet/vehicle/update-vehicle');
    } catch (error) {
        res.render('error', { message: 'Error updating vehicle.' });
    }
});


router.patch('/vehicle/:id', isAuthenticated, async(req, res) => {
    try {
        // await axios.patch(`${process.env.APP_URI}/vehicle/${req.params.id}`, req.body, {
        //     headers: {
        //         Authorization: `Bearer ${req.cookies.token}`
        //     }
        // });
        res.redirect(`/manage-vehicle`);
    } catch (error) {
        res.render('error', { message: 'Error updating vehicle.' });
    }
});


// delete
router.delete('/vehicle/:id', isAuthenticated, async(req, res) => {
    try {
        // await axios.delete(`${process.env.APP_URI}/vehicle/${req.params.id}`, {
        //     headers: {
        //         Authorization: `Bearer ${req.cookies.token}`
        //     }
        // });
        res.redirect('/manage-vehicle');
    } catch (error) {
        res.render('error', { message: 'Error deleting vehicle.' });
    }
});

// list assigned vehicle
router.get('/assigned-vehicle', isAuthenticated, async(req, res) => {
    try {
        // const response = await axios.get(`${process.env.APP_URI}/admin/vehicle`, {
        //     headers: {
        //         Authorization: `Bearer ${req.cookies.token}`
        //     }
        // });
        // const vehicle = response.data;
        res.render('fleet/vehicle/assign-vehicle');
    } catch (error) {
        console.error('Error fetching vehicle:', error);
        res.render('error', { message: 'Error fetching vehicle.' });
    }
});

router.post('/assigned-vehicle', isAuthenticated, async(req, res) => {
    try {
        // await axios.post(`${process.env.APP_URI}/admin/vehicle`, req.body, {
        //     headers: {
        //         Authorization: `Bearer ${req.cookies.token}`
        //     }
        // });
        res.redirect('/manage-vehicle');
    } catch (error) {
        res.render('error', { message: 'Error assigning vehicle.' });
    }
});

// delete assigned vehicle
router.delete('/vehicle/:id', isAuthenticated, async(req, res) => {
    try {
        // await axios.delete(`${process.env.APP_URI}/vehicle/${req.params.id}`, {
        //     headers: {
        //         Authorization: `Bearer ${req.cookies.token}`
        //     }
        // });
        res.redirect('/assigned-vehicle');
    } catch (error) {
        res.render('error', { message: 'Error deleting vehicle.' });
    }
});

module.exports = router;