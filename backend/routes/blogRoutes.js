const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// fetch all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ updated_at: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
});

// fetching a blog
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch blog' });
  }
});

// updating or saving
router.post('/save-draft', async (req, res) => {
  try {
    const blogData = {
      title: req.body.title,
      content: req.body.content,
      tags: req.body.tags,
      status: 'draft',
    };

    let blog;
    if (req.query.id) {
      blog = await Blog.findByIdAndUpdate(req.query.id, blogData, { new: true });
    } else {
      blog = await Blog.create(blogData);
    }
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save draft' });
  }
});

// publishing
router.post('/publish', async (req, res) => {
  try {
    const blogData = {
      title: req.body.title,
      content: req.body.content,
      tags: req.body.tags,
      status: 'published',
    };

    let blog;

    if (req.query.id) {
      // updating
      blog = await Blog.findByIdAndUpdate(req.query.id, blogData, { new: true });
    } else {
      // creating
      blog = await Blog.create(blogData);
    }

    res.json(blog);
  } catch (err) {
    console.error('Publish error:', err);
    res.status(500).json({ error: 'Failed to publish blog' });
  }
});


// deleting
router.delete('/:id', async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete blog' });
  }
});


module.exports = router;
