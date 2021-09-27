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
// if (!req.session.jwt) {
//   // return next();
//   res.send({ currentUser: null });
// }

// try {
//   const payload = jwt.verify(req.session.jwt, config.secret);
//   req.currentUser = payload;
// } catch (err) {
//   res.send({ currentUser: null });
// }
// next();
// if (!req.session.jwt) {
//   return res.send({ currentUser: null });
// }
// jwt.verify(req.session.jwt, config.secret, (err, decoded) => {
//   if (err) {
//     return res.status(401).send({
//       message: 'Unauthorized!',
//     });
//   }
//   req.userId = decoded.id;
//   console.log(req.userId);
//   next();
// });

module.exports = currentUser;
