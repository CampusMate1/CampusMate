const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port:process.env.PORT
});

connection.connect((err) => {
  if (err) throw err;
  console.log('✅ MySQL connected');
});

module.exports = connection;
