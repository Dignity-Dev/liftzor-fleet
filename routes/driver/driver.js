// routes/driver/driver.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../../utils/middleware/auth');
const driverController = require('../../controller/driver/driver');
const authr = require("../../utils/middleware/authMiddleware");

// Routes
router.get('/manage-driver', authMiddleware, driverController.getAllDrivers);
// router.get('/new-driver', isAuthenticated, driverController.getNewDriverForm);
// router.get('/driver/:id', isAuthenticated, driverController.getDriverById);
// router.get('/update-driver/:id', isAuthenticated, driverController.getUpdateDriverForm);
// router.patch('/drivers/:id', isAuthenticated, driverController.updateDriver);
// router.delete('/drivers/:id', isAuthenticated, driverController.deleteDriver);

module.exports = router;
