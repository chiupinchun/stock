var express = require('express')
var router = express.Router()
const Crawler = require('../utils/crawl')
const stockModel = require('../model/stock')

/* GET home page. */
router.get('/', async (req, res) => {
  const crawl = new Crawler({
    url: 'https://tw.stock.yahoo.com/quote/4946.TWO'
  })
  const data = await crawl.fetch()
  res.send({ data })
})

module.exports = router
