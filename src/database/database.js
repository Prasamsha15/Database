'use strict';

const pg = require('pg');

const pool = pg.Pool({
  connectionString: 'postgres://postgres:postgres@postgresql:5432/instabook'
});

const query = async query => (await pool.query(query)).rows;
const queries = async queries => (await pool.queries(queries)).columns;

module.exports = {
  query,
  queries
};
