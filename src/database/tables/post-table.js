'use strict';

const database = require('../database');
const SQL = require('pg-template-tag').default;

const createTable = () => database.query(`
  CREATE TABLE IF NOT EXISTS
    posts
    (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT NULL
      
    );
`);

const createRow = data => database.query(SQL`
  INSERT INTO
    posts
    (
      title,
      content,
      user_id
    
    )
  VALUES
    (
      ${data.title},
      ${data.content},
      ${data.userId}

      
    );
`);

const getRows = () => database.query(`
  SELECT
   *
  FROM
    posts;
`);

const getRow = id => database.query(SQL`
  SELECT
   *
  FROM
    posts
  WHERE
    id = ${id};
`);

const updateRow = (id, data) => database.query(SQL`
  UPDATE
    posts
  SET
    title = ${data.title},
    content = ${data.content}
  WHERE
    id = ${id}
  RETURNING
    *;
`);

module.exports = {
  createTable,
  createRow,
  getRows,
  getRow,
  updateRow
};
