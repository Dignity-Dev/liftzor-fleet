// Get all drivers
router.get('/drivers', verifyJWT, async(req, res) => {
    try {
        const response = await fetch(`${APP_URI}/drivers`, {
            headers: {
                'Authorization': `Bearer ${req.headers['authorization']}`
            }
        });
        const drivers = await response.json();
        res.render('admin/drivers', { drivers });
    } catch (error) {
        res.status(500).send('Error fetching drivers');
    }
});

// Create driver
router.post('/drivers', verifyJWT, async(req, res) => {
    try {
        const response = await fetch(`${APP_URI}/drivers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${req.headers['authorization']}`
            },
            body: JSON.stringify(req.body)
        });
        res.redirect('/admin/drivers');
    } catch (error) {
        res.status(500).send('Error creating driver');
    }
});