// routes/driver/driver.js
const express = require('express');
const router = express.Router();
const authorize = require('../../../utils/middleware/adminMiddleware');
const fleetcustomerController = require('../../controller/customer/customer');

// Apply the authorization middleware to all routes within this router
router.use(authorize);

// Routes
router.post('/fleet/manage-customer', fleetcustomerController.getAllCustomers);
// router.post('/fleet/new-driver', driverController.getNewDriverForm);
router.post('/fleet/customer/:id', fleetcustomerController.getCustomerById);
// router.post('/fleet/update-driver/:id', driverController.getUpdateDriverForm);
// router.patch('/drivers/:id', driverController.updateDriver);
// router.delete('/drivers/:id', driverController.deleteDriver);

module.exports = router;