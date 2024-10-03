const axios = require('axios');

// Fetch all drivers from API
// exports.getAllDrivers = async(req, res) => {
//     try {
//         // Retrieve the JWT token from cookies or headers
//         const token = req.cookies.token; // Assuming the token is stored in cookies

//         // If there's no token, redirect to the sign-in page
//         if (!token) {
//             return res.redirect('/sign-in'); // Redirect to login if token is missing
//         }

//         // Make the API call to get all drivers, passing the token in the Authorization header
//         const response = await axios.get(`${process.env.APP_URI}/admin/drivers`, {
//             headers: {
//                 Authorization: `Bearer ${token}` // Pass the token in the headers
//             }
//         });

//         const drivers = response.data;

//         // Render the drivers page with the fetched data
//         res.render('fleet/driver/driver', { drivers, error: null });
//     } catch (error) {
//         console.error('Error fetching drivers:', error);

//         // Handle different types of errors
//         if (error.response && error.response.status === 401) {
//             // If the token is invalid or expired, redirect to sign-in page
//             return res.redirect('/sign-in');
//         }

//         // Render the page with an error message in case of other errors
//         res.render('fleet/driver/driver', { drivers: [], error: 'Error fetching drivers.' });
//     }
// };
// Controller to fetch and render all drivers
exports.getAllDrivers = async(req, res) => {
    try {
        // Retrieve JWT token from cookies
        const token = req.cookies.token;
        console.log('Token in cookies:', token);

        // Check if token is missing and handle it
        if (!token) {
            console.log('No token found, redirecting to sign-in page.');
            return res.redirect('/sign-in');
        }

        // Make API call to fetch drivers, passing token in the Authorization header
        console.log('Making API request to fetch drivers...');
        const response = await axios.get(`${process.env.APP_URI}/admin/drivers`, {
            headers: {
                Authorization: `Bearer ${token}` // Pass token in headers
            }
        });

        // Check if drivers data was received
        const drivers = response.data;
        if (!drivers || drivers.length === 0) {
            console.log('No drivers found.');
            return res.render('fleet/driver/driver', { drivers: [], error: 'No drivers available.' });
        }

        // Render the drivers page with the retrieved data
        console.log('Drivers fetched successfully:', drivers);
        res.render('fleet/driver/driver', { drivers, error: null });

    } catch (error) {
        console.error('Error fetching drivers:', error);

        // Handle token-related errors, such as expiration or invalid token
        if (error.response && error.response.status === 401) {
            console.log('Invalid or expired token, redirecting to sign-in page.');
            return res.redirect('/sign-in');
        }

        // Handle other API errors
        res.render('fleet/driver/driver', { drivers: [], error: 'Error fetching drivers.' });
    }
};


// Render form to create a new driver
exports.getNewDriverForm = (req, res) => {
    res.render('fleet/driver/new-driver');
};

// Get details of one driver
exports.getDriverById = async(req, res) => {
    try {
        // const response = await axios.get(`${process.env.APP_URI}/admin/drivers/${req.params.id}`, {
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
        // await axios.patch(`${process.env.APP_URI}/drivers/${req.params.id}`, req.body, {
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
        // await axios.delete(`${process.env.APP_URI}/drivers/${req.params.id}`, {
        //     headers: {
        //         Authorization: `Bearer ${req.cookies.token}`
        //     }
        // });
        res.redirect('/manage-driver');
    } catch (error) {
        res.render('error', { message: 'Error deleting driver.' });
    }
};
