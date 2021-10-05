const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require('./config/connection');
const cors = require('cors');

const routes = require('./controller');
const PORT = process.env.PORT || 5000;

const cookieSession = require('cookie-session');

const app = express();
app.set('trust proxy', true);
app.use(bodyParser.json());

app.use(
  cookieSession({
    signed: false,
    secure: true,
    httpOnly: true,
  })
);

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}!`);
  });
});
