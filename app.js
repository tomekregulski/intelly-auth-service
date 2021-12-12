const express = require('express');
// const bodyParser = require('body-parser');
const path = require('path');

const errorHandler = require('./handlers/error');

const cookieParser = require('cookie-parser');
const sequelize = require('./config/connection');
const cors = require('cors');

const routes = require('./controller');
const PORT = process.env.PORT || 5000;

const cookieSession = require('cookie-session');

const app = express();
app.use(cookieParser());
app.set('trust proxy', true);
// app.use(bodyParser.json());

app.use(
  cookieSession({
    name: 'intelly',
    signed: false, // OG false
    secure: false, // OG true
    httpOnly: false, // OG true
  })
);

app.use(cors());

// app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(errorHandler);

module.exports = app;
