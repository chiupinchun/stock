const url = require('url')
const http = require('http')
const https = require('https')
const { toAst, parseSelector, searchNode, isNode } = require('./htmlTools')

const parseProtocol = (protocol) => {
  switch (protocol) {
    case 'http:':
      return http
    case 'https:':
      return https
    default:
      throw new Error('無法解析網址協議，請檢察傳入網址格式是否正確。')
  }
}

module.exports = class Crawler {
  options
  html
  fetch(opt) {
    this.options = opt
    return new Promise((resolve) => {
      const urlObj = url.parse(this.options.url)
      const { request } = parseProtocol(urlObj.protocol)

      const req = request(
        this.options.url,
        {
          headers: this.options.headers,
          method: this.options.method || 'GET'
        },
        (res) => {
          let chunks = []
          res.on('data', (chunk) => void chunks.push(chunk))
          res.on('end', () => {
            this.html = toAst(Buffer.concat(chunks).toString('utf-8'))
            resolve(this)
          })
        }
      )

      req.end()
    })
  }
  search(selector) {
    const selectors = parseSelector(selector)
    let node = this.html
    selectors.forEach((select) => {
      if (isNode(node)) {
        node = searchNode(node, select)
      }
    })
    return Array.isArray(node?.childNodes) ? node.childNodes.reduce((res, item) => res + (item.value ?? 'object'), '') : null
  }
}
