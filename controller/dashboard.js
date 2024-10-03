const axios = require('axios');

// Render dashboard Page
exports.renderDashboard = (req, res) => {
    res.render('fleet/dashboard');
};
