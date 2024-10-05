const axios = require('axios');

// Fetch all customers from API
// exports.getAllcustomers = async(req, res) => {
//     try {
//         // Retrieve the JWT token from cookies or headers
//         const token = req.cookies.token; // Assuming the token is stored in cookies

//         // If there's no token, redirect to the sign-in page
//         if (!token) {
//             return res.redirect('/sign-in'); // Redirect to login if token is missing
//         }

//         // Make the API call to get all customers, passing the token in the Authorization header
//         const response = await axios.get(`${process.env.APP_URI}/admin/customers`, {
//             headers: {
//                 Authorization: `Bearer ${token}` // Pass the token in the headers
//             }
//         });

//         const customers = response.data;

//         // Render the customers page with the fetched data
//         res.render('fleet/customer/customer', { customers, error: null });
//     } catch (error) {
//         console.error('Error fetching customers:', error);

//         // Handle different types of errors
//         if (error.response && error.response.status === 401) {
//             // If the token is invalid or expired, redirect to sign-in page
//             return res.redirect('/sign-in');
//         }

//         // Render the page with an error message in case of other errors
//         res.render('fleet/customer/customer', { customers: [], error: 'Error fetching customers.' });
//     }
// };
// Controller to fetch and render all customers


// Render form to create a new customer

exports.getAllCustomers = async(req, res) => {
    try {
        const token = req.cookies.token;
        const response = await axios.get(`${process.env.APP_URI}/admin/users`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const customers = response.data.data;
        if (!customers || customers.length === 0) {
            return res.render('fleet/customer/customer', { customers: [], error: 'No customers available.' });
        }

        res.render('fleet/customer/customer', { customers, error: null });
    } catch (error) {
        if (error.response && error.response.status === 401) {
            return res.redirect('/sign-in');
        }

        res.render('fleet/customer/customer', { customers: [], error: 'Error fetching customers.' });
    }
};


// exports.getNewcustomerForm = (req, res) => {
//     res.render('fleet/customer/new-customer');
// };

exports.getCustomerById = async(req, res) => {
    let customerId; // Declare customerId outside the try block so it's accessible everywhere

    try {
        customerId = req.params.id; // Get customer ID from the route parameters
        const token = req.cookies.token; // Extract token from cookies

        // console.log('Fetching customer with ID:', customerId); // Debug log for customer ID

        // Fetch customer data from the external API using query parameters
        const response = await axios.get(`${process.env.APP_URI}/admin/getOneUser/${customerId}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Pass token in the headers
            },
        });

        const customer = response.data.data; // Access the customer data
        if (!customer || customer.length === 0) {
            // console.log(`customer with ID: ${customerId} not found.`);
            return res.status(404).render('fleet/customer/view-customer', { customer: null, error: 'customer not found.' });
        }

        // Render the customer details page with the retrieved data
        // console.log('customer fetched successfully:', customer);
        res.render('fleet/customer/view-customer', { customer, error: null });

    } catch (error) {
        console.error('Error fetching customer:', error.response ? error.response.data : error.message);

        if (error.response && error.response.status === 404) {
            // console.log(`customer with ID: ${customerId} not found.`); // customer ID will now be accessible
            return res.status(404).render('fleet/customer/view-customer', { customer: null, error: 'customer not found.' });
        }

        // Handle token-related errors, such as expiration or invalid token
        if (error.response && error.response.status === 401) {
            // console.log('Invalid or expired token, redirecting to sign-in page.');
            return res.redirect('/sign-in');
        }

        // Handle other API errors
        res.status(500).render('fleet/customer/view-customer', { customer: null, error: 'Error fetching customer details.' });
    }
};


// Render edit customer form with current customer details
// exports.getUpdatecustomerForm = async(req, res) => {
//     try {
//         const customerId = req.params.id; // Get customer ID from the route parameters
//         const token = req.cookies.token; // Extract token from cookies

//         // Fetch current customer data from the external API
//         const response = await axios.get(`${process.env.APP_URI}/admin/customers/${customerId}`, {
//             headers: {
//                 Authorization: `Bearer ${token}`, // Pass token in headers
//             }
//         });

//         const customer = response.data.data; // Access the customer data

//         if (!customer) {
//             return res.status(404).render('fleet/customer/update-customer', { customer: null, error: 'customer not found.' });
//         }

//         // Render the edit customer form with the current customer details
//         res.render('fleet/customer/update-customer', { customer, error: null });

//     } catch (error) {
//         console.error('Error fetching customer for editing:', error.response ? error.response.data : error.message);

//         if (error.response && error.response.status === 404) {
//             return res.status(404).render('fleet/customer/update-customer', { customer: null, error: 'customer not found.' });
//         }

//         // Handle other errors
//         res.status(500).render('fleet/customer/update-customer', { customer: null, error: 'Error fetching customer details.' });
//     }
// };

// Update customer details
// exports.updatecustomer = async(req, res) => {
//     try {
//         const customerId = req.params.id; // Get customer ID from the route parameters
//         const token = req.cookies.token; // Extract token from cookies

//         // Update customer data through the external API
//         const response = await axios.patch(`${process.env.APP_URI}/admin/customers/${customerId}`, req.body, {
//             headers: {
//                 Authorization: `Bearer ${token}`, // Pass token in headers
//             }
//         });

//         // Assuming the update was successful and you want to redirect back to customer details
//         res.redirect(`/customers/${customerId}`); // Redirect to the customer's detail page after successful update

//     } catch (error) {
//         console.error('Error updating customer:', error.response ? error.response.data : error.message);

//         // Handle token-related errors
//         if (error.response && error.response.status === 401) {
//             console.log('Invalid or expired token, redirecting to sign-in page.');
//             return res.redirect('/sign-in');
//         }

//         // Handle other API errors
//         res.status(500).render('fleet/customer/update-customer', { customer: req.body, error: 'Error updating customer details.' });
//     }
// };

// Delete customer by ID
// exports.deletecustomer = async(req, res) => {
//     try {
//         const customerId = req.params.id; // Get customer ID from the route parameters
//         const token = req.cookies.token; // Extract token from cookies

//         // Send DELETE request to the external API to delete the customer
//         await axios.delete(`${process.env.APP_URI}/admin/customers/${customerId}`, {
//             headers: {
//                 Authorization: `Bearer ${token}`, // Pass token in headers
//             }
//         });

//         // Redirect to the customers list page after successful deletion
//         res.redirect('/manage-customer'); // Redirect to the list of customers after deletion

//     } catch (error) {
//         console.error('Error deleting customer:', error.response ? error.response.data : error.message);

//         // Handle token-related errors
//         if (error.response && error.response.status === 401) {
//             console.log('Invalid or expired token, redirecting to sign-in page.');
//             return res.redirect('/sign-in');
//         }

//         // Handle other API errors
//         res.status(500).render('fleet/customer/customers', { error: 'Error deleting customer.' });
//     }
// };

// Render update form for a customer
// exports.getUpdatecustomerForm = async(req, res) => {
//     try {
//         res.render('fleet/customer/update-customer', { customer: {} });
//     } catch (error) {
//         res.render('error', { message: 'Error rendering update customer form.' });
//     }
// };

// Update customer details
// exports.updatecustomer = async(req, res) => {
//     try {
//         // await axios.patch(`${process.env.APP_URI}/customers/${req.params.id}`, req.body, {
//         //     headers: {
//         //         Authorization: `Bearer ${req.cookies.token}`
//         //     }
//         // });
//         res.redirect(`/manage-customer`);
//     } catch (error) {
//         res.render('error', { message: 'Error updating customer.' });
//     }
// };

// Delete a customer
// exports.deletecustomer = async(req, res) => {
//     try {
//         // await axios.delete(`${process.env.APP_URI}/customers/${req.params.id}`, {
//         //     headers: {
//         //         Authorization: `Bearer ${req.cookies.token}`
//         //     }
//         // });
//         res.redirect('/manage-customer');
//     } catch (error) {
//         res.render('error', { message: 'Error deleting customer.' });
//     }
// };