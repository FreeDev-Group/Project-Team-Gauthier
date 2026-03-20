const mysql = require('mysql2');
const { db } = require('./environment');

// Création du pool de connexions
const pool = mysql.createPool({
  host: db.host,
  user: db.user,
  password: db.password,
  database: db.name,
  port: db.port,
  socketPath: '/opt/lampp/var/mysql/mysql.sock', // Socket spécifique à XAMPP
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Exporter une version promise du pool pour supporter async/await
module.exports = pool.promise();
