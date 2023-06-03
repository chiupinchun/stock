const mysql2 = require('mysql2')

module.exports = mysql2
  .createPool({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '',
    database: 'stock',
    connectionLimit: 1
  })
  .promise()
