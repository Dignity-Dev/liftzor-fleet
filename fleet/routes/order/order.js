// routes/driver/driver.js
const express = require('express');
const router = express.Router();
const authorize = require('../../../utils/middleware/adminMiddleware');
const fleetorderController = require('../../controller/order/order');

// Apply the authorization middleware to all routes within this router
// router.use(authorize);

// Routes
router.post('/fleet/manage-order', fleetorderController.getAllOrders);
router.post('/fleet/order/:id', fleetorderController.getOrderById);
router.post('/fleet/new-order', fleetorderController.getPendingOrders);
router.post('/fleet/assign-driver', fleetorderController.assignOrderToDriver);
router.post('/fleet/assigned-order', fleetorderController.assignedOrders);


module.exports = router;