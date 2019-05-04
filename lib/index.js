const Parse = require('../build/Release/parse')
const getColor = require('./colors.js')
const path = require('path')

// default assignment
module.exports = (fileName = '', pathObj = {}, fn = () => {}) => {
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
    if (item.attributes) {
      if ('fill' in item.attributes)item.attributes.fill = getColor(item.attributes.fill)
      if ('stroke' in item.attributes)item.attributes.stroke = getColor(item.attributes.stroke)
      if ('stroke-width' in item.attributes)item.attributes['stroke-width'] = parseFloat(item.attributes['stroke-width'])
    } else {
      item.attributes = {
        'fill': [0, 0, 0, 1]
      }
    }
  })
  Parse.parse(fileName, pathObj, fn)
}
