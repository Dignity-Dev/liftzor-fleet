// ftch all
router.get('/vehicles', isAuthenticated, async(req, res) => {
    try {
        const response = await axios.get(`${process.env.APP_URI}/vehicles`, {
            headers: {
                Authorization: `Bearer ${req.cookies.token}`
            }
        });
        const vehicles = response.data;
        res.render('vehicles/index', { vehicles });
    } catch (error) {
        res.render('error', { message: 'Error fetching vehicles.' });
    }
});

// create
router.post('/vehicles', isAuthenticated, async(req, res) => {
    try {
        await axios.post(`${process.env.APP_URI}/vehicles`, req.body, {
            headers: {
                Authorization: `Bearer ${req.cookies.token}`
            }
        });
        res.redirect('/vehicles');
    } catch (error) {
        res.render('error', { message: 'Error creating vehicle.' });
    }
});

// update
router.put('/vehicles/:id', isAuthenticated, async(req, res) => {
    try {
        await axios.put(`${process.env.APP_URI}/vehicles/${req.params.id}`, req.body, {
            headers: {
                Authorization: `Bearer ${req.cookies.token}`
            }
        });
        res.redirect('/vehicles');
    } catch (error) {
        res.render('error', { message: 'Error updating vehicle.' });
    }
});

// assign vehicle to driver

router.post('/vehicles/:id/assign', isAuthenticated, async(req, res) => {
    const { driverId } = req.body;
    try {
        await axios.post(`${process.env.APP_URI}/vehicles/${req.params.id}/assign`, { driverId }, {
            headers: {
                Authorization: `Bearer ${req.cookies.token}`
            }
        });
        res.redirect('/vehicles');
    } catch (error) {
        res.render('error', { message: 'Error assigning vehicle to driver.' });
    }
});


// delete vehicle route
router.delete('/vehicles/:id', isAuthenticated, async(req, res) => {
    try {
        await axios.delete(`${process.env.APP_URI}/vehicles/${req.params.id}`, {
            headers: {
                Authorization: `Bearer ${req.cookies.token}`
            }
        });
        res.redirect('/vehicles');
    } catch (error) {
        res.render('error', { message: 'Error deleting customer.' });
    }
});