const mysql = require('mysql2');
const config = require('./config');

// const connection = mysql.createConnection(config.db);
// connection.connect();

// module.exports = connection;

const pool = mysql.createPool(config.db);

module.exports = pool;
