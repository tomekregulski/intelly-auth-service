const jwt = require('jsonwebtoken');

const currentUser = (req, res, next) => {
  if (!req.session.jwt) {
    // return next();
    res.send({ currentUser: null });
  }

  try {
    const payload = jwt.verify(req.session.jwt, config.secret);
    req.currentUser = payload;
  } catch (err) {
    res.send({ currentUser: null });
  }
  next();
};

module.exports = currentUser;
