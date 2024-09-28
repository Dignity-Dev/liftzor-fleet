//fetch all
router.get('/customers', isAuthenticated, async(req, res) => {
    try {
        const response = await axios.get(`${process.env.APP_URI}/customers`, {
            headers: {
                Authorization: `Bearer ${req.cookies.token}`
            }
        });
        const customers = response.data;
        res.render('customers/index', { customers });
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