const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');

const currentUser = (req, res, next) => {
  let token = req.session.jwt;
  // console.log(token);

  if (!token) {
    return res.status(403).send({
      message: 'No token provided!',
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized!',
      });
    } else {
      console.log(token);
    }
    next();
  });
};

module.exports = currentUser;
