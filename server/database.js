require('dotenv').config();
const mysql = require('mysql');
const { promisify } = require('util');

database = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

const pool = mysql.createPool(database);
pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.log('Database lost connection');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.log('Database have too many connections');
    }
    if (err.code === 'ECONNREFUSED') {
      console.log('Database connection refused');
    }
  }

  if (connection) {
    connection.release();
  }
  console.log('Connection achieved! 😀');
  return;
});
pool.query = promisify(pool.query);

module.exports = pool;
