const router = require('express').Router();
const { Post, User } = require('../models');

// Create new post
router.post('/', async (req, res) => {
  try {
    const post = await Post.create({
      ...req.body,
      userId: req.session.userId
    });
    res.redirect('/dashboard');
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update post
router.put('/:id', async (req, res) => {
  try {
    await Post.update(req.body, {
      where: { id: req.params.id }
    });
    res.redirect('/dashboard');
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete post
router.delete('/:id', async (req, res) => {
  try {
    await Post.destroy({
      where: { id: req.params.id }
    });
    res.redirect('/dashboard');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
