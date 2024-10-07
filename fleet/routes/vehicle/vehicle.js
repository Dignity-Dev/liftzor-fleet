// routes/driver/driver.js
const express = require('express');
const router = express.Router();
const authorize = require('../../../utils/middleware/adminMiddleware');
const fleetvehicleController = require('../../controller/vehicle/vehicle');

// Apply the authorization middleware to all routes within this router
router.use(authorize);

// Routes
router.post('/fleet/manage-vehicle', fleetvehicleController.getAllVehicle);
router.post('/fleet/vehicle/:id', fleetvehicleController.getvehicleById);

module.exports = router;