const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');

const requireAuth = (req, res, next) => {
  if (!req.currentUser) {
    return res.send('Not authorized');
  }
  console.log(req);
  next();
};

// verifyToken = (req, res, next) => {
//   let token = req.session.jwt;
//   // let token = user.accessToken
//   console.log(token);

//   if (!token) {
//     return res.status(403).send({
//       message: 'No token provided!',
//     });
//   }

//   jwt.verify(token, config.secret, (err, decoded) => {
//     if (err) {
//       return res.status(401).send({
//         message: 'Unauthorized!',
//       });
//     }
//     req.userId = decoded.id;
//     console.log(req.userId);
//     next();
//   });
// };

module.exports = requireAuth;
