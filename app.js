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

// Import Routes
const authRoutes = require('./routes/auth/auth');
const dashboardRoutes = require('./routes/dashboard');
const driverRoutes = require('./routes/driver/driver');
const customerRoutes = require('./routes/customer/customer');
// const orderRoutes = require('./routes/order');
// const vehicleRoutes = require('./routes/vehicle');
// const paymentRoutes = require('./routes/payment');

// Use Routes
app.use('/', authRoutes);
app.use('/', dashboardRoutes);
app.use('/', driverRoutes);
app.use('/', customerRoutes);
// app.use('/', orderRoutes);
// app.use('/', vehicleRoutes);
// app.use('/', paymentRoutes);

// Error handling middleware
const errorHandler = require('./utils/middleware/errorHandler');
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
