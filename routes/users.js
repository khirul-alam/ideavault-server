const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Login হলে JWT token দাও
router.post('/jwt', (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token });
});

module.exports = router;