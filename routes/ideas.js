const express = require('express');
const router = express.Router();
const Idea = require('../models/Idea');
const verifyToken = require('../middleware/verifyToken');

// সব ideas পাও (search + filter সহ)
router.get('/', async (req, res) => {
  try {
    const { search, category } = req.query;
    let query = {};

    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }
    if (category) {
      query.category = category;
    }

    const ideas = await Idea.find(query).sort({ createdAt: -1 });
    res.json(ideas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Trending — মাত্র 6টা
router.get('/trending', async (req, res) => {
  try {
    const ideas = await Idea.find().sort({ createdAt: -1 }).limit(6);
    res.json(ideas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// একটা idea এর details
router.get('/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (!idea) return res.status(404).json({ message: 'Idea not found' });
    res.json(idea);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// নতুন idea add করো (private)
router.post('/', verifyToken, async (req, res) => {
  try {
    const idea = new Idea(req.body);
    const saved = await idea.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// idea update করো (private)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const updated = await Idea.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// idea delete করো (private)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Idea.findByIdAndDelete(req.params.id);
    res.json({ message: 'Idea deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;