const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const config = require('../config/auth.config');
// const currentUser = require('../middleware/currentUser');
const requireAuth = require('../middleware/requireAuth');

router.get(
  '/',
  requireAuth,
  // authJwt,
  // AdminOnlyRoute,
  async (req, res) => {
    console.log(req);
    try {
      const allUsers = await User.findAll({
        attributes: {
          exclude: ['password'],
        },
      });
      const userData = allUsers.map((user) => user.get({ plain: true }));
      res.status(200).json(userData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
);

router.post(
  '/',
  // authJwt,
  // AdminOnlyRoute,
  async (req, res) => {
    try {
      const userData = await User.create({
        email: req.body.email,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        brands: req.body.brands,
        roles: req.body.role,
      });

      res.status(200).json(userData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }
);

router.put(
  '/:id',
  // authJwt, AdminOnlyRoute,
  async (req, res) => {
    try {
      const userData = await User.update(
        {
          email: req.body.email,
          password: req.body.password,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          brands: req.body.brands,
          roles: req.body.role,
        },
        {
          where: {
            id: req.params.id,
          },
          individualHooks: true,
        }
      );
      res.status(200).json(userData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }
);

router.delete(
  '/:id',
  // authJwt, AdminOnlyRoute,
  async (req, res) => {
    try {
      const userData = await User.destroy({
        where: {
          id: req.params.id,
        },
      });

      if (!userData) {
        res.status(404).json({ message: `No such user found!` });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    console.log(userData);
    if (!userData) {
      res.status(400).json('Incorrect username or password...');
      return;
    }

    const passwordData = await userData.checkPassword(req.body.password);

    if (!passwordData) {
      res.status(400).json('Incorrect username or password...');
      return;
    }

    const token = jwt.sign({ id: userData.id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });

    req.session = {
      jwt: token,
    };

    console.log(userData.role);
    console.log('password OK');

    res.status(200).send({
      id: userData.id,
      first_name: userData.first_name,
      last_name: userData.last_name,
      email: userData.email,
      brands: userData.brands,
      roles: userData.role,
      accessToken: token,
    });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.get('/current-user', (req, res) => {
  console.log(req.session);
  // res.send({ currentUser: req.currentUser || null });
  if (!req.session.jwt) {
    return res.send({ currentUser: null });
  }
  try {
    const payload = jwt.verify(req.session.jwt, config.secret);
    res.send({ currentUser: payload });
  } catch (err) {
    res.send({ currentUser: null });
  }
});

router.post('/logout', (req, res) => {
  req.session = null;

  res.send({});
});

module.exports = router;
