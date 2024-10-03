// routes/driver/driver.js
const express = require('express');
const router = express.Router();
const customerController = require('../../controller/customer/customer');

// Routes
router.get('/manage-customer', customerController.getAllCustomers);
// router.get('/new-driver', isAuthenticated, driverController.getNewDriverForm);
// router.get('/driver/:id', isAuthenticated, driverController.getDriverById);
// router.get('/update-driver/:id', isAuthenticated, driverController.getUpdateDriverForm);
// router.patch('/drivers/:id', isAuthenticated, driverController.updateDriver);
// router.delete('/drivers/:id', isAuthenticated, driverController.deleteDriver);

module.exports = router;
