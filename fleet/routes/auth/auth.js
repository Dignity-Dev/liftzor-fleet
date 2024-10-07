// routes/driver/driver.js
const express = require('express');
const router = express.Router();
const fleetauthController = require('../../controller/auth/auth');

// Routes
// Render the signin page
router.post('/fleet/sign-in', fleetauthController.renderSignIn);

// Handle the login
router.post('/fleet/sign-in', fleetauthController.signin);

// Render the signout
router.post('/fleet/logout', fleetauthController.signOut);

module.exports = router;