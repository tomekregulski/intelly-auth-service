const jwt = require('jsonwebtoken');

const currentUser = (req, res, next) => {
  if (!req.session.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(req.session.jwt, config.secret);
    req.currentUser = payload;
  } catch (err) {}
  next();
};

module.exports = currentUser;
