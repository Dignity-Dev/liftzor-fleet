// routes/driver/driver.js
const express = require('express');
const router = express.Router();
const authorize = require('../../../utils/middleware/adminMiddleware');
const fleetdriverController = require('../../controller/driver/driver');

// Apply the authorization middleware to all routes within this router
router.use(authorize);

// Routes
router.post('/fleet/manage-driver', fleetdriverController.getAllDrivers);
// router.post('/fleet/new-driver', fleetdriverController.getNewDriverForm);
router.post('/fleet/driver/:id', fleetdriverController.getDriverById);
// router.post('/fleet/update-driver/:id', fleetdriverController.getUpdateDriverForm);
// router.patch('/drivers/:id', fleetdriverController.updateDriver);
// router.delete('/drivers/:id', fleetdriverController.deleteDriver);

module.exports = router;