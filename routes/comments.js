const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const verifyToken = require('../middleware/verifyToken');

// user এর সব comments (My Interactions) - আগে রাখো
router.get('/user/:email', verifyToken, async (req, res) => {
  try {
    const comments = await Comment.find({ userEmail: req.params.email })
                                  .sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// কোনো idea র সব comments
router.get('/:ideaId', async (req, res) => {
  try {
    const comments = await Comment.find({ ideaId: req.params.ideaId })
                                  .sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// comment add করো (private)
router.post('/', verifyToken, async (req, res) => {
  try {
    const comment = new Comment(req.body);
    const saved = await comment.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// comment update (private)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const updated = await Comment.findByIdAndUpdate(
      req.params.id,
      { commentText: req.body.commentText },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// comment delete (private)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;