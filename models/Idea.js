const mongoose = require('mongoose');

const ideaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  shortDescription: { type: String, required: true },
  detailedDescription: { type: String, required: true },
  category: {
    type: String,
    enum: ['Tech', 'Health', 'AI', 'Education', 'Finance', 'Other'],
    required: true
  },
  tags: [String],
  imageURL: { type: String },
  estimatedBudget: { type: String },
  targetAudience: { type: String, required: true },
  problemStatement: { type: String, required: true },
  proposedSolution: { type: String, required: true },
  authorEmail: { type: String, required: true },
  authorName: { type: String, required: true },
  authorPhoto: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Idea', ideaSchema);