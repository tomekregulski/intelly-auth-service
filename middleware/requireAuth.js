const requireAuth = (req, res, next) => {
  // if (!req.currentUser) {
  //   return res.send('Not authorized');
  // }
  console.log(req);
  next();
};
