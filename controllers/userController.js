const router = require('express').Router();
const { User } = require('../models');

// Sign up route
router.post('/signup', async (req, res) => {
  try {
    const user = await User.create(req.body);
    req.session.userId = user.id;
    res.redirect('/');
  } catch (err) {
    res.status(500).json(err);
  }
});

// Log in route
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });
    if (user && user.checkPassword(req.body.password)) {
      req.session.userId = user.id;
      res.redirect('/');
    } else {
      res.status(400).send('Invalid credentials');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Log out route
router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = router;
