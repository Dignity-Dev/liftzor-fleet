// fetch all
router.get('/drivers', isAuthenticated, async(req, res) => {
    try {
        const response = await axios.get(`${process.env.APP_URI}/drivers`, {
            headers: {
                Authorization: `Bearer ${req.cookies.token}`
            }
        });
        const drivers = response.data;
        res.render('drivers/index', { drivers });
    } catch (error) {
        res.render('error', { message: 'Error fetching drivers.' });
    }
});

// create new
router.post('/drivers', isAuthenticated, async(req, res) => {
    try {
        await axios.post(`${process.env.APP_URI}/drivers`, req.body, {
            headers: {
                Authorization: `Bearer ${req.cookies.token}`
            }
        });
        res.redirect('/drivers');
    } catch (error) {
        res.render('error', { message: 'Error creating driver.' });
    }
});

// update

router.put('/drivers/:id', isAuthenticated, async(req, res) => {
    try {
        await axios.put(`${process.env.APP_URI}/drivers/${req.params.id}`, req.body, {
            headers: {
                Authorization: `Bearer ${req.cookies.token}`
            }
        });
        res.redirect(`/drivers`);
    } catch (error) {
        res.render('error', { message: 'Error updating driver.' });
    }
});


// delete
router.delete('/drivers/:id', isAuthenticated, async(req, res) => {
    try {
        await axios.delete(`${process.env.APP_URI}/drivers/${req.params.id}`, {
            headers: {
                Authorization: `Bearer ${req.cookies.token}`
            }
        });
        res.redirect('/drivers');
    } catch (error) {
        res.render('error', { message: 'Error deleting driver.' });
    }
});

//