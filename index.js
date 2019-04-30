const Parse = require('./lib/index.js')
const { pathParse, serializePath } = require('svg-path-parse')

// cairo_move_to   cairo_rel_move_to ()   => M/m
// cairo_line_to   cairo_rel_line_to ()   => L/l、 H/h、V/v
// 弧形 cairo_arc()   cairo_arc_negative ()    => A/r
// 贝塞尔曲线 cairo_curve_to()   cairo_rel_curve_to ()    => C/c、Q/q、T/t、S/s
// cairo_close_path()   => Z/z

// support svg, png, PostScript(ps), Encapsulated PostScript(eps), pdf
const command = 'M10 80 Q 52.5 10, 95 80 T 180 80'

const pathDatas = pathParse(command).absCairo({
  round: 2
})

const pathDat = pathParse('M230 230A 45 45, 0, 1, 1, 275 275L 275 230 Z').absCairo({
  round: 2
})
const { segments } = pathDatas
// console.log('pathDatas', serializePath(pathDatas))
// console.error('segments', segments)

Parse('test.eps', {
  paths: [
    {
      d: segments,
      mode: 'stroke'
    },
    {
      d: pathDat.segments,
      mode: 'fill'
    }
  ],
  size: 1024
})

