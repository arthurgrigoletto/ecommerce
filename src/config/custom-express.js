require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const passportConfig = require('./passport');
const routes = require('../routes');
const cacheService = require('../models/service/CacheService');

module.exports = () => {
  const app = express();

  // Body Parser Middleware
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // Morgan Middleware
  app.use(morgan('dev'));

  // CORS
  app.use(cors());

  // Passport Middleware
  app.use(passport.initialize());

  // Passport Config
  passportConfig(passport);

  // Connect to MongDb
  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

  // Use Routes
  app.use('/api', routes);

  // Static Files
  app.use('/files', express.static(path.resolve(__dirname, '..', '..', 'tmp', 'uploads')));

  cacheService.createCacheFolders();

  return app;
};
