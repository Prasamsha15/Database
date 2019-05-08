'use strict';

// Import the Express server module
const express = require('express');
const commentTable = require('../../database/tables/comment-table');

// Create our router for our comments API
const commentRouter = express.Router();

// Get all comments
commentRouter.get('/', async (req, res) => {
  try {
    const comments = await commentTable.getcolumns();
    res.json(comments); 
  } catch (err) {
    console.error(err);
    res.status(500).json({});
  }
});

// Create a comment
commentRouter.post('/', async (req, res) => {
  const data = req.body;
  try {
    const comments = await commentTable.createcolumn(data);
    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({});
  }
});

// Get one specific comment by id
commentRouter.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const comment = (await commentTable.getcolumn(id))[0];
    res.json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({});
  }
});

// Modify one specific comment by id
commentRouter.put('/:id', async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const comment = (await commentTable.updatecolumn(id, data))[0];
    res.json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({});
  }
});

// Delete one specific comment by id
commentRouter.delete('/:id', (req, res) => res.json({}));

// Export our comment router
module.exports = commentRouter;
