// Get all payments
router.get('/payments', verifyJWT, async(req, res) => {
    try {
        const response = await fetch(`${APP_URI}/payments`, {
            headers: {
                'Authorization': `Bearer ${req.headers['authorization']}`
            }
        });
        const payments = await response.json();
        res.render('admin/payments', { payments });
    } catch (error) {
        res.status(500).send('Error fetching payments');
    }
});