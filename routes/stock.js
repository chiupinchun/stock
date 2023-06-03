var express = require('express')
var router = express.Router()
const Crawler = require('../utils/crawl')
const stockModel = require('../model/stock')

/* GET home page. */
router.get('/test_html', async (req, res) => {
  const crawl = await new Crawler().fetch({
    url: 'https://tw.stock.yahoo.com/quote/4946.TWO'
  })
  res.send(crawl.html)
})
router.get('/', async (req, res) => {
  const crawl = await new Crawler().fetch({
    url: 'https://tw.stock.yahoo.com/quote/4946.TWO'
  })
  const price = crawl.search('#main-0-QuoteHeader-Proxy .D(f).Jc(sb).Ai(fe) span')
  const deels = crawl.search('.D(f).Jc(sb).Ai(c).Mstart(0).Mend(16px).Fz(16px)--mobile.Fz(14px).Pt(4px).Bdtw(1px).Bdts(s).Bdtc($bd-primary-divider)')
  //  + crawl.search('.D(f).Jc(sb).Ai(c).C(#232a31).Fz(16px)--mobile.Fz(14px).Pt(4px).Bdtw(1px).Bdts(s).Bdtc($bd-primary-divider).Mstart(16px).Mend(0)')
  res.send({
    price,
    deels
  })
})

module.exports = router
