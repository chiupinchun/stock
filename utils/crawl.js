const url = require('url')
const http = require('http')
const https = require('https')

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
  constructor(opt) {
    this.options = opt
  }
  fetch() {
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
            const result = Buffer.concat(chunks).toString('utf-8')
            resolve(result)
          })
        }
      )

      req.end()
    })
  }
}
