const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  tags: [String],
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft',
  },
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Blog', blogSchema);
