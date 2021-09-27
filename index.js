const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require('./config/connection');
const cors = require('cors');

const routes = require('./controller');
const PORT = process.env.PORT || 5000;

const cookieSession = require('cookie-session');

const app = express();
// If using Nginx in future, this line may be required
// app.set('trust proxy', true);
app.use(bodyParser.json());

app.use(
  cookieSession({
    signed: false,
    // secure: true,
    secure: process.env.NODE_ENV !== 'test',
  })
);
// var corsOptions = {
//   origin: '/',
// };

// app.use(cors(corsOptions));
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
