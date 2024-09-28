// Get all orders
router.get('/orders', verifyJWT, async(req, res) => {
    try {
        const response = await fetch(`${APP_URI}/orders`, {
            headers: {
                'Authorization': `Bearer ${req.headers['authorization']}`
            }
        });
        const orders = await response.json();
        res.render('admin/orders', { orders });
    } catch (error) {
        res.status(500).send('Error fetching orders');
    }
});

// Delete order
router.delete('/orders/:id', verifyJWT, async(req, res) => {
    try {
        const response = await fetch(`${APP_URI}/orders/${req.params.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${req.headers['authorization']}`
            }
        });
        res.redirect('/admin/orders');
    } catch (error) {
        res.status(500).send('Error deleting order');
    }
});