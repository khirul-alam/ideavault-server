const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const ideaRoutes = require('./routes/ideas');
const commentRoutes = require('./routes/comments');
const userRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS fix
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://ideavault-client-alpha.vercel.app'
  ],
  credentials: true
}));

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ DB Error:', err));

app.use('/ideas', ideaRoutes);
app.use('/comments', commentRoutes);
app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.send('IdeaVault Server Running! 🚀');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});