'use strict';

// Import the Express server module
const express = require('express');
const postTable = require('../../database/tables/post-table');

// Create our router for our posts API
const postRouter = express.Router();

// Get all posts
postRouter.get('/', async (req, res) => {
  try {
    const posts = await postTable.getRows();
    res.json(posts); 
  } catch (err) {
    console.error(err);
    res.status(500).json({});
  }
});

// Create a post
postRouter.post('/', async (req, res) => {
  const data = req.body;
  try {
    const posts = await postTable.createRow(data);
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({});
  }
});

// Get one specific post by id
postRouter.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const post = (await postTable.getRow(id))[0];
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({});
  }
});

// Modify one specific post by id
postRouter.put('/:id', async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const post = (await postTable.updateRow(id, data))[0];
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({});
  }
});

// Delete one specific post by id
postRouter.delete('/:id', (req, res) => res.json({}));

// Export our post router
module.exports = postRouter;
