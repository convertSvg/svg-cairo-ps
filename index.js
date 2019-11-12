
const SVGParser = require('convertpath')
const Parse = require('./lib/index.js')
// eslint-disable-next-line no-unused-vars
const { pathParse, serializePath } = require('svg-path-parse')

// cairo_move_to   cairo_rel_move_to ()   => M/m
// cairo_line_to   cairo_rel_line_to ()   => L/l、 H/h、V/v
// 弧形 cairo_arc()   cairo_arc_negative ()    => A/r
// 贝塞尔曲线 cairo_curve_to()   cairo_rel_curve_to ()    => C/c、Q/q、T/t、S/s
// cairo_close_path()   => Z/z

const parse = SVGParser.parse('./calendar.svg', {
  plugins: [
    {
      convertUseToGroup: true, // at first
    },
    {
      convertShapeToPath: true,
    },
    {
      removeGroups: true,
    },
    {
      convertTransfromforPath: true,
    },
    {
      viewBoxTransform: true, // at last
    }
  ],
  size: 1000,
})

const paths = parse.getPathAttributes()
const pathDatas = []
paths.forEach(item => {
  if (item.d) {
    const { err, segments } = pathParse(item.d).relCairo({ round: 2 })
    console.error('segments', segments)
    if (!err) {
      pathDatas.push({
        'd': segments,
        'attributes': {
          'fill': item.fill
        }
      })
    }
  }
})


// support svg, png, PostScript(ps), Encapsulated PostScript(eps), pdf
const command = 'M970.48 514.88v130.43h-916.96v-130.43h891.69m39.39-55.18h-945.2c-21.69 0-39.37 17.7-39.37 39.39v162.01c0 21.69 17.68 39.4 39.37 39.4h945.2c21.72 0 39.37-17.7 39.37-39.4v-162.01c0-21.69-17.65-39.4-39.37-39.39z m-365.21-405.62v188.99h-214.78v-188.99h214.78m54.64-54.08h-324.06v296.56h324.06v-296.56z m-41.95 296.56l149.96 163.14h-540.48l150.61-163.14h239.91m41.95-53.49h-324.06l-249.54 271.81h825.29l-251.69-271.81z m54.57 780.9 a 19.67 19.67 0 0 1-19.7-19.67c0-35.52 12.77-54.65 23.02-70.01 9.14-13.74 16.38-24.58 16.38-48.15 0-23.47-7.19-34.2-16.27-47.78-10.29-15.36-23.12-34.47-23.13-70.36 a 19.67 19.67 0 1 1 39.4 0c0 23.9 7.25 34.74 16.44 48.45 10.21 15.25 22.93 34.22 22.93 69.69 0 35.52-12.75 54.62-22.98 70.01-9.16 13.72-16.38 24.58-16.39 48.15 a 19.67 19.67 0 0 1-19.7 19.67z m-157.53 0 a 19.7 19.7 0 0 1-19.7-19.67c0-35.52 12.77-54.65 23.01-70.01 9.16-13.74 16.38-24.58 16.39-48.15 0-23.47-7.19-34.2-16.28-47.78-10.29-15.36-23.12-34.47-23.12-70.36 a 19.7 19.7 0 0 1 39.4 0c0 23.9 7.25 34.74 16.44 48.45 10.21 15.25 22.93 34.22 22.93 69.69 0 35.52-12.75 54.62-22.99 70.01-9.16 13.72-16.38 24.58-16.38 48.15 a 19.67 19.67 0 0 1-19.7 19.67z m-157.54 0 a 19.67 19.67 0 0 1-19.67-19.67c0-35.52 12.75-54.65 22.99-70.01 9.16-13.74 16.38-24.58 16.38-48.15 0-23.47-7.19-34.2-16.27-47.78-10.29-15.36-23.09-34.47-23.1-70.36 a 19.67 19.67 0 1 1 39.37 0c0 23.9 7.25 34.74 16.44 48.45 10.21 15.25 22.96 34.22 22.96 69.69 0 35.52-12.77 54.62-23.01 70.01-9.16 13.72-16.38 24.58-16.39 48.15 a 19.67 19.67 0 0 1-19.7 19.67z m-157.53 0 a 19.67 19.67 0 0 1-19.67-19.67c0-35.52 12.75-54.65 22.98-70.01 9.16-13.74 16.38-24.58 16.39-48.15 0-23.47-7.19-34.2-16.28-47.78-10.29-15.36-23.09-34.47-23.09-70.36 a 19.67 19.67 0 1 1 39.37 0c0 23.9 7.25 34.74 16.44 48.45 10.21 15.25 22.96 34.22 22.96 69.69 0 35.52-12.77 54.62-23.02 70.01-9.16 13.72-16.38 24.58-16.38 48.15 a 19.67 19.67 0 0 1-19.7 19.67z'

// console.error('svgpath(command).unarc().round(2).toString()', svgpath(command).unarc().round(2).toString())
// const pathData = pathParse(svgpath(command).unarc().round(2).toString()).absCairo({
//   round: 2
// })

// console.log('pathData', serializePath(pathData))
// console.error('segments', segments)

// fill: #ddd, stroke: red, stroke-width: 2, stroke-linecap: "butt", fill-rule:nonzero
Parse('test222.eps', {
  paths: pathDatas,
  // paths: [
  //   {
  //     d: segments,
  //     attributes: {
  //       fill: '#666',
  //       stroke: '#000',
  //       // 'stroke-width': 2,
  //       // 'stroke-linecap': 'butt'
  //     }
  //   }
  //   // {
  //   //   d: pathDat.segments,
  //   //   attributes: {
  //   //     fill: 'green',
  //   //     stroke: '#fec',
  //   //     'stroke-width': '10',
  //   //     'stroke-linecap': 'round'
  //   //   }
  //   // }
  // ],
  size: 1024
}, (data, tips) => {
  console.error(data, tips)
})
