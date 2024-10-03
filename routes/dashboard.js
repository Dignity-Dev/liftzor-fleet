const express = require('express');
const router = express.Router();
const dashboardRouter = require("../controller/dashboard")


// Render to dashboard
router.get('/dashboard', dashboardRouter.renderDashboard);


module.exports = router;
