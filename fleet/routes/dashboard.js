const express = require('express');
const router = express.Router();
const fleetdashboardRouter = require("../controller/dashboard");
const authorize = require('../../utils/middleware/fleetMidddleware');

// Render to dashboard

router.post('/fleet/dashboard', authorize, fleetdashboardRouter.renderDashboard);


module.exports = router;