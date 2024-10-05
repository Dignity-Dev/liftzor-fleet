const express = require('express');
const router = express.Router();
const dashboardRouter = require("../controller/dashboard")
const authorize = require('../utils/middleware/auth');




// Render to dashboard
router.get('/dashboard', authorize, dashboardRouter.renderDashboard);


module.exports = router;