// routes/driver/driver.js
const express = require('express');
const router = express.Router();
const orderController = require('../../controller/order/order');
const authorize = require('../../utils/middleware/auth');

// Apply the authorization middleware to all routes within this router
// router.use(authorize);

// Routes
router.get('/manage-order', orderController.getAllOrders);
router.get('/customer/:id', orderController.getOrderById);


module.exports = router;