var express = require('express')
var router = express.Router()
const stockModel = require('../model/stock')

/* GET home page. */
router.get('/', async (req, res) => {
  const { query } = req
  let where = ''
  const whereKeys = Object.keys(query)
  if (whereKeys.length) where += ' WHERE ' + whereKeys.map((key) => `${key}=${typeof query[key] === 'string' ? `"${query[key]}"` : query[key]}`).join(' AND ')
  console.log('select * from members' + where)
  const data = (await stockModel.query('select * from members' + where))[0]
  res.send(data)
})

module.exports = router
