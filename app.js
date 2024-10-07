const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize the app
const app = express();

// Import middleware
const setupMiddleware = require('./utils/middleware/middleware');

// Set up middleware
setupMiddleware(app);

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static folder for assets
app.use(express.static(path.join(__dirname, 'assets')));

// start of admin route

// Import Routes
const authRoutes = require('./admin/routes/auth/auth');
const dashboardRoutes = require('./admin/routes/dashboard');
const driverRoutes = require('./admin/routes/driver/driver');
const customerRoutes = require('./admin/routes/customer/customer');
const orderRoutes = require('./admin/routes/order/order');
const fleetoutes = require('./admin/routes/fleet/fleet');
const vehicleRoutes = require('./admin/routes/vehicle/vehicle');


// Use Routes
app.use('/', authRoutes);
app.use('/', dashboardRoutes);
app.use('/', driverRoutes);
app.use('/', customerRoutes);
app.use('/', orderRoutes);
app.use('/', fleetoutes);
app.use('/', vehicleRoutes);

// end of admin route

// start of fleet route
// Import Routes
const fleetauthRoutes = require('./fleet/routes/auth/auth');
const fleetdashboardRoutes = require('./fleet/routes/dashboard');
const fleetdriverRoutes = require('./fleet/routes/driver/driver');
const fleetcustomerRoutes = require('./fleet/routes/customer/customer');
const fleetorderRoutes = require('./fleet/routes/order/order');
const fleetvehicleRoutes = require('./fleet/routes/vehicle/vehicle');


// Use Routes
app.use('/fleet', fleetauthRoutes);
app.use('/fleet', fleetdashboardRoutes);
app.use('/fleet', fleetdriverRoutes);
app.use('/fleet', fleetcustomerRoutes);
app.use('/fleet', fleetorderRoutes);
app.use('/fleet', fleetvehicleRoutes);

// end of fleet routes

// Error handling middleware
const errorHandler = require('./utils/middleware/errorHandler');
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});