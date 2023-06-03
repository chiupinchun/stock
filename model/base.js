const mysql2 = require('mysql2')

module.exports = class Mysql {
  connection
  constructor(db) {
    this.connection = mysql2
      .createPool({
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: '',
        database: db,
        connectionLimit: 1
      })
      .promise()
  }
  createWhere(where) {
    let result = ''
    if (where?.and || where?.or) {
      result += ' WHERE '
      if (where.and) {
        result += Object.keys(where.and)
          .map((key) => `${key}=${where.and[key]}`)
          .join(' AND ')
      }
      if (where.and && where.or) result += ' OR '
      if (where.or) {
        result += Object.keys(where.or)
          .map((key) => `${key}=${where.or[key]}`)
          .join(' OR ')
      }
    }
    return result
  }
  find(target, where, opt) {
    let colums, table
    switch (typeof target) {
      case 'string':
        colums = '*'
        table = target
        break
      case 'object':
        if (Array.isArray(target)) throw new Error('Mysql.prototype.find的第一個參數不可以是陣列')
        if (target === null) throw new Error('Mysql.prototype.find的第一個參數不可以是null')
        colums = target.colums ?? '*'
        table = target.table
    }
    let query = 'SELECT ' + colums + ' FROM ' + table + this.createWhere(where)
    return this.connection.query(query)
  }
  insert(table, data) {
    const keys = Object.keys(data)
    let query = 'INSERT INTO ' + table + '(' + keys.join(',') + ') VALUES (' + keys.map((key) => (typeof data[key] === 'string' ? `"${data[key]}"` : data[key])).join(',') + ')'
    return this.connection.query(query)
  }
  update(table, data) {
    const keys = Object.keys(data)
    let query = 'UPDATE ' + table + ' SET ' + keys.map((key) => (typeof data[key] === 'string' ? `"${data[key]}"` : data[key])).join(',') + ')'
    return this.connection.query(query)
  }
}
