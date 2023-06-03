const parse5 = require('parse5')

const toAst = (htmlStr) => {
  const ast = parse5.parse(htmlStr)
  const parse = (html) => {
    delete html.parentNode
    if (Array.isArray(html.childNodes)) html.childNodes.map((node) => parse(node))
    return html
  }
  return parse(ast)
}

/**
 *
 * @param {string} selector
 * @returns ({
 *  tag?: string,
 *  class: string[],
 *  id: string[]
 * })
 */
const parseSelector = (selector) => {
  let selectors
  if (typeof selector === 'string') selectors = selector.split(' ')
  else if (Array.isArray(selector)) selectors = selector
  else throw new Error('不合法的selector')

  return selectors.reduce((res, selector) => {
    const match = selector.match(/([\.|\#]?[^\.|^\#]+)/g)
    if (match) {
      const condition = {
        tag: undefined,
        class: [],
        id: []
      }
      match.forEach((item) => {
        switch (true) {
          case item[0] === '.':
            condition.class.push(item.slice(1))
            break
          case item[0] === '#':
            condition.id.push(item.slice(1))
            break
          default:
            condition.tag = item
        }
      })
      res.push(condition)
    }
    return res
  }, [])
}

const checkNode = (node, condition) => {
  if (!node || !condition) throw new Error('checkNode的參數皆為必填')
  if (condition.tag && node.nodeName !== condition.tag) return false
  if ((condition.class || condition.id) && !node.attrs) return false

  const nodeClass = node.attrs.find((attr) => attr.name === 'class')?.value
  const nodeId = node.attrs.find((attr) => attr.name === 'id')?.value

  if (condition.class.length && condition.class.some((item) => !nodeClass?.includes(item))) return false
  if (condition.id.length && condition.id.some((item) => !nodeId?.includes(item))) return false

  return true
}

const searchNode = (targetNode, condition) => {
  let result
  const deepSearch = (node) => {
    if (result !== undefined) return
    if (checkNode(node, condition)) return (result = node)
    if (node.childNodes?.length) node.childNodes.forEach((child) => deepSearch(child))
  }
  deepSearch(targetNode)
  return result ?? null
}

const isNode = (toCheck) => typeof toCheck?.nodeName === 'string'

module.exports = {
  toAst,
  parseSelector,
  checkNode,
  searchNode,
  isNode
}
