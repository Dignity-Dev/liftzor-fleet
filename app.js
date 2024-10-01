const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const jwt = require('jsonwebtoken');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(express.json())

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static folder for assets
app.use(express.static(path.join(__dirname, 'assets')));

// Homepage page
app.get('/', (req, res) => {
    res.redirect('/sign-in');
});

// Homepage page
// app.get('/dashboard', (req, res) => {
//     res.render('fleet/dashboard', { error: null });
// });


// Middleware and Routes
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const driverRoutes = require('./routes/driver/driver');
const customerRoutes = require('./routes/customer/customer');
const orderRoutes = require('./routes/order/order');
const vehicleRoutes = require('./routes/vehicle/vehicle');
const paymentRoutes = require('./routes/payment/payment');


// Use Routes
app.use('/', authRoutes);
app.use('/', dashboardRoutes);
app.use('/', driverRoutes);
app.use('/', customerRoutes);
app.use('/', orderRoutes);
app.use('/', vehicleRoutes);
app.use('/', paymentRoutes);













// Server listening
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});