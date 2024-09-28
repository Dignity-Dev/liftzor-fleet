//fetch all
router.get('/orders', isAuthenticated, async(req, res) => {
    try {
        const response = await axios.get(`${process.env.APP_URI}/orders`, {
            headers: {
                Authorization: `Bearer ${req.cookies.token}` // JWT token
            }
        });
        const orders = response.data;
        res.render('orders/index', { orders });
    } catch (error) {
        res.render('error', { message: 'Error fetching orders.' });
    }
});

//single
router.get('/orders/:id', isAuthenticated, async(req, res) => {
    try {
        const response = await axios.get(`${process.env.APP_URI}/orders/${req.params.id}`, {
            headers: {
                Authorization: `Bearer ${req.cookies.token}`
            }
        });
        const order = response.data;
        res.render('orders/details', { order });
    } catch (error) {
        res.render('error', { message: 'Error fetching order details.' });
    }
});

// delete
router.delete('/orders/:id', isAuthenticated, async(req, res) => {
    try {
        await axios.delete(`${process.env.APP_URI}/orders/${req.params.id}`, {
            headers: {
                Authorization: `Bearer ${req.cookies.token}`
            }
        });
        res.redirect('/orders');
    } catch (error) {
        res.render('error', { message: 'Error deleting order.' });
    }
});



// assign order
router.post('/orders/:id/assign', isAuthenticated, async(req, res) => {
    const { driverId } = req.body;
    try {
        await axios.post(`${process.env.APP_URI}/orders/${req.params.id}/assign`, { driverId }, {
            headers: {
                Authorization: `Bearer ${req.cookies.token}`
            }
        });
        res.redirect(`/orders/${req.params.id}`);
    } catch (error) {
        res.render('error', { message: 'Error assigning order to driver.' });
    }
})