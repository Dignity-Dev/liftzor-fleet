const express = require('express');
const router = express.Router();
const axios = require('axios');
const jwt = require('jsonwebtoken');


// Middleware to authenticate and protect routes
const isAuthenticated = require('../../middleware/auth'); // Your custom auth middleware
// fetch all
// router.get('/manage-driver', isAuthenticated, async(req, res) => {
//     // try {
//     //     const response = await axios.get(`${process.env.APP_URI}/admin/drivers`, {
//     //         headers: {
//     //             Authorization: `Bearer ${req.cookies.token}`
//     //         }
//     //     });
//     //     const drivers = response.data;
//     //     res.render('fleet/driver', { drivers });
//     // } catch (error) {
//     //     res.render('error', { message: 'Error fetching drivers.' });
//     // }
//     console.log(isAuthenticated.token);
//     res.render('fleet/driver', { drivers });
// });

router.get('/manage-driver', async(req, res) => {
    try {
        // const response = await axios.get(`${process.env.APP_URI}/admin/drivers`, {
        //     headers: {
        //         Authorization: `Bearer ${req.cookies.token}`
        //     }
        // });
        // const drivers = response.data;
        res.render('fleet/driver/driver');
    } catch (error) {
        console.error('Error fetching drivers:', error);
        res.render('error', { message: 'Error fetching drivers.' });
    }
});


// create new
router.get('/new-driver', isAuthenticated, async(req, res) => {
    try {
        // await axios.post(`${process.env.APP_URI}/admin/drivers`, req.body, {
        //     headers: {
        //         Authorization: `Bearer ${req.cookies.token}`
        //     }
        // });
        res.render('fleet/driver/new-driver');
    } catch (error) {
        res.render('error', { message: 'Error creating driver.' });
    }
});

// get one
router.get('/driver/:id', isAuthenticated, async(req, res) => {
    try {
        // await axios.post(`${process.env.APP_URI}/admin/drivers`, req.body, {
        //     headers: {
        //         Authorization: `Bearer ${req.cookies.token}`
        //     }
        // });
        res.render('fleet/driver/view-driver');
    } catch (error) {
        res.render('error', { message: 'Error getting a driver.' });
    }
});


// update
// render update form
router.get('/update-driver/:id', isAuthenticated, async(req, res) => {
    try {
        // await axios.post(`${process.env.APP_URI}/admin/drivers`, req.body, {
        //     headers: {
        //         Authorization: `Bearer ${req.cookies.token}`
        //     }
        // });
        res.render('fleet/driver/update-driver');
    } catch (error) {
        res.render('error', { message: 'Error updating driver.' });
    }
});


router.patch('/drivers/:id', isAuthenticated, async(req, res) => {
    try {
        // await axios.patch(`${process.env.APP_URI}/drivers/${req.params.id}`, req.body, {
        //     headers: {
        //         Authorization: `Bearer ${req.cookies.token}`
        //     }
        // });
        res.redirect(`/manage-driver`);
    } catch (error) {
        res.render('error', { message: 'Error updating driver.' });
    }
});


// delete
router.delete('/drivers/:id', isAuthenticated, async(req, res) => {
    try {
        // await axios.delete(`${process.env.APP_URI}/drivers/${req.params.id}`, {
        //     headers: {
        //         Authorization: `Bearer ${req.cookies.token}`
        //     }
        // });
        res.redirect('/manage-driver');
    } catch (error) {
        res.render('error', { message: 'Error deleting driver.' });
    }
});


module.exports = router;