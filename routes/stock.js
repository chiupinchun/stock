var express = require('express')
var router = express.Router()
const Crawler = require('../utils/crawl')
const stockModel = require('../model/stock')

/* GET home page. */
router.get('/', async (req, res) => {
  const crawl = await new Crawler().fetch({
    url: 'https://tw.stock.yahoo.com/quote/4946.TWO'
  })
  const price = crawl.search('#main-0-QuoteHeader-Proxy .D(f).Jc(sb).Ai(fe) span')
  res.send({
    price
  })
})

module.exports = router
