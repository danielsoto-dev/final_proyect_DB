const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const persona_r = require('./routes/persona');
require('dotenv').config();
var app = express();

//settings
app.set('port', process.env.SERVER_PORT || 3001);

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//routes
app.use('/api/personas', persona_r);
//error route
app.use(function (req, res, next) {
  res.status(404);
  res.send('Nothing to see here 👺');
});

module.exports = app;
