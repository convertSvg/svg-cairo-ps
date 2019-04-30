const Parse = require('../build/Release/parse')
const getColor = require('./colors.js')
const path = require('path')

module.exports = (fileName = '', pathObj = {}) => {
  if (!fileName || typeof fileName !== 'string') throw 'file name no exist or file name no string !'
  const extname = path.extname(fileName).replace('.', '').toUpperCase()


  switch (extname) {
    case 'SVG':
      pathObj.type = 'svg'
      break
    case 'PS':
    case 'EPS':
      pathObj.type = 'ps'
      break
    case 'PNG':
      pathObj.type = 'png'
      break
    case 'PDF':
      pathObj.type = 'pdf'
      break
    default :
      throw 'This format is not supported !'
      break
  }

  pathObj.paths.forEach(item => {
    if (item.color) {
      item.color = getColor(item.color)
    } else {
      item.color = [0, 0, 0, 1]
    }
    console.error('item.color', item.color)
  })

  Parse.parse(fileName, pathObj)
}
