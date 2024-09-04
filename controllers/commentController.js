const router = require('express').Router();
const { Comment, User, Post } = require('../models');

// Add comment
router.post('/', async (req, res) => {
  try {
    const comment = await Comment.create({
      ...req.body,
      userId: req.session.userId
    });
    res.redirect(`/posts/${req.body.postId}`);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
