require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');


const app = express();
const authRoutes = require('./routes/auth');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', authRoutes);

app.listen(3000, () => {
    console.log('Server is running on');
});