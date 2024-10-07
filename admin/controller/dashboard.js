const axios = require('axios');

// Render dashboard Page
exports.renderDashboard = (req, res) => {
    res.render('admin/components/dashboard');
};