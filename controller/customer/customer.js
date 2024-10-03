const axios = require('axios');

// Fetch all Customers from API
exports.getAllCustomers = async(req, res) => {
    try {
        // Make the API call to get all Customers
        const response = await axios.get(`${process.env.APP_URI}/admin/users`, {
            headers: {
                Authorization: `Bearer ${req.cookies.token}`,
            },
            withCredentials: true
        });

        const Customers = response.data;

        // Render the Customers page with the fetched data
        res.render('fleet/customer/customer', { Customers, error: null });
    } catch (error) {
        console.error('Error fetching Customers:', error);
        res.render('fleet/customer/customer', { Customers: [], error: 'Error fetching Customers' });
    }
};


// Render form to create a new driver
exports.getNewDriverForm = (req, res) => {
    res.render('fleet/driver/new-driver');
};

// Get details of one driver
exports.getDriverById = async(req, res) => {
    try {
        // const response = await axios.get(`${process.env.APP_URI}/admin/Customers/${req.params.id}`, {
        //     headers: {
        //         Authorization: `Bearer ${req.cookies.token}`
        //     }
        // });
        // const driver = response.data;
        res.render('fleet/driver/view-driver', { driver: {} });
    } catch (error) {
        res.render('error', { message: 'Error getting a driver.' });
    }
};

// Render update form for a driver
exports.getUpdateDriverForm = async(req, res) => {
    try {
        res.render('fleet/driver/update-driver', { driver: {} });
    } catch (error) {
        res.render('error', { message: 'Error rendering update driver form.' });
    }
};

// Update driver details
exports.updateDriver = async(req, res) => {
    try {
        // await axios.patch(`${process.env.APP_URI}/Customers/${req.params.id}`, req.body, {
        //     headers: {
        //         Authorization: `Bearer ${req.cookies.token}`
        //     }
        // });
        res.redirect(`/manage-driver`);
    } catch (error) {
        res.render('error', { message: 'Error updating driver.' });
    }
};

// Delete a driver
exports.deleteDriver = async(req, res) => {
    try {
        // await axios.delete(`${process.env.APP_URI}/Customers/${req.params.id}`, {
        //     headers: {
        //         Authorization: `Bearer ${req.cookies.token}`
        //     }
        // });
        res.redirect('/manage-driver');
    } catch (error) {
        res.render('error', { message: 'Error deleting driver.' });
    }
};
