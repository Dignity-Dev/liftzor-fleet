// Get all payments
router.get('/payments', isAuthenticated, async(req, res) => {
    try {
        const response = await axios.get(`${process.env.APP_URI}/payments`, {
            headers: {
                Authorization: `Bearer ${req.cookies.token}`
            }
        });
        const payments = response.data;
        res.render('payments/index', { payments });
    } catch (error) {
        res.render('error', { message: 'Error fetching payments.' });
    }
});