const axios = require('axios');

// Fetch all orders from API
exports.getAllOrders = async(req, res) => {
    try {
        const token = req.cookies.token;
        const response = await axios.get(`${process.env.APP_URI}/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const orders = response.data.data;
        console.log(orders)
        if (!orders || orders.length === 0) {
            return res.render('fleet/order/order', { orders: [], error: 'No orders available.' });
        }

        res.render('fleet/order/order', { orders, error: null });
    } catch (error) {
        if (error.response && error.response.status === 401) {
            return res.redirect('/sign-in');
        }

        res.render('fleet/order/order', { orders: [], error: 'Error fetching orders.' });
    }
};

exports.getOrderById = async(req, res) => {
    let driverId; // Declare driverId outside the try block so it's accessible everywhere

    try {
        driverId = req.params.id; // Get driver ID from the route parameters
        const token = req.cookies.token; // Extract token from cookies

        // console.log('Fetching driver with ID:', driverId); // Debug log for driver ID

        // Fetch driver data from the external API using query parameters
        const response = await axios.get(`${process.env.APP_URI}/admin/getOneDriver/${driverId}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Pass token in the headers
            },
        });

        const driver = response.data.data; // Access the driver data

        if (!driver || driver.length === 0) {
            // console.log(`Driver with ID: ${driverId} not found.`);
            return res.status(404).render('fleet/driver/view-driver', { driver: null, error: 'Driver not found.' });
        }

        // Render the driver details page with the retrieved data
        // console.log('Driver fetched successfully:', driver);
        res.render('fleet/driver/view-driver', { driver, error: null });

    } catch (error) {
        console.error('Error fetching driver:', error.response ? error.response.data : error.message);

        if (error.response && error.response.status === 404) {
            // console.log(`Driver with ID: ${driverId} not found.`); // Driver ID will now be accessible
            return res.status(404).render('fleet/driver/view-driver', { driver: null, error: 'Driver not found.' });
        }

        // Handle token-related errors, such as expiration or invalid token
        if (error.response && error.response.status === 401) {
            // console.log('Invalid or expired token, redirecting to sign-in page.');
            return res.redirect('/sign-in');
        }

        // Handle other API errors
        res.status(500).render('fleet/driver/view-driver', { driver: null, error: 'Error fetching driver details.' });
    }
};