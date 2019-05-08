'use strict';

const database = require('../database');
const SQL = require('pg-template-tag').default;

const createTable = () => database.queries(`
  CREATE TABLE IF NOT EXISTS
    comments
    (
      id SERIAL PRIMARY KEY,
      content TEXT NOT NULL,
      user_id TEXT NULL,
      post_id TEXT NOT NULL
    );
`);

const createColumns = data => database.queries(SQL`
  INSERT INTO
    comments
    (
      id,
      content,
      user_id,
      post_id
    )
  VALUES
    (
      ${data.id},
      ${data.content},
      ${data.userId},
      ${data.postId}

    );
`);

const getColumns = () => database.queries(`
  SELECT
   *
  FROM
    comments;
`);

const getColumn = id => database.queries(SQL`
  SELECT
   *
  FROM
    comments
  WHERE
    id = ${id};
`);

const updateColumns = (id, data) => database.queries(SQL`
  UPDATE
    comments
  SET
    content = ${data.content},
    user_id = ${data.userId}
  WHERE
    id = ${id}
  RETURNING
    *;
`);

module.exports = {
  createTable,
  createColumns,
  getColumns,
  getColumn,
  updateColumns
};
