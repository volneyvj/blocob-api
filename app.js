require('dotenv').config();

const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const logger = require('morgan');

// Connect DB

require('./config/db.config');

const app = express();

app.use(cors(
  { allowedHeaders: ['Content-Type', 'Authorization'] },
));


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//  Routes Middleware
const apiRoutes = require('./routes/api.routes');

app.use('/', apiRoutes);

module.exports = app;


