const Parse = require('./lib/index.js')
// eslint-disable-next-line no-unused-vars
const { pathParse, serializePath } = require('svg-path-parse')

// cairo_move_to   cairo_rel_move_to ()   => M/m
// cairo_line_to   cairo_rel_line_to ()   => L/l、 H/h、V/v
// 弧形 cairo_arc()   cairo_arc_negative ()    => A/r
// 贝塞尔曲线 cairo_curve_to()   cairo_rel_curve_to ()    => C/c、Q/q、T/t、S/s
// cairo_close_path()   => Z/z

// support svg, png, PostScript(ps), Encapsulated PostScript(eps), pdf
const command = 'M971.55 361.72H811.71V311.37H921.18A39.96 39.96 0 0 0 961.14 271.41V102.8A39.96 39.96 0 0 0 921.18 62.86H102.82A39.96 39.96 0 0 0 62.86 102.8V271.41A39.96 39.96 0 0 0 102.82 311.37H187.32V361.72H52.45A39.96 39.96 0 0 1 12.49 321.76V52.45A39.96 39.96 0 0 1 52.45 12.49H971.55A39.96 39.96 0 0 1 1011.51 52.45V321.76A39.96 39.96 0 0 1 971.55 361.72ZM686.88 697.42C686.88 718.95 669.07 736.43 647.09 736.43H377.31C355.35 736.43 337.52 718.95 337.52 697.42V611.58H387.15V650.59C387.15 672.12 404.95 687.25 426.93 687.25H596.44C618.42 687.25 636.23 669.8 636.23 648.24V537.35H387.27C359.8 537.35 337.52 515.05 337.52 487.52V312.37C337.52 284.85 359.8 262.57 387.27 262.57H637.15C664.63 262.57 686.88 284.85 686.88 312.37V487.52C686.88 496.34 685.28 504.51 682.43 511.7H686.88V697.42ZM636.88 337.17A24.98 24.98 0 0 0 611.9 312.2H412.1A24.98 24.98 0 0 0 387.12 337.17V462.05A24.98 24.98 0 0 0 412.1 487.02H611.9A24.98 24.98 0 0 0 636.88 462.05V337.17ZM137.14 922A39.96 39.96 0 0 0 177.23 961.91H846.52C868.68 961.91 886.63 944.05 886.63 922V362.15H936.29V971.55C936.29 993.63 918.45 1011.51 896.45 1011.51H127.55A39.89 39.89 0 0 1 87.71 971.55V362.15H137.14V922Z'

const pathDatas = pathParse(command).relCairo({
  round: 2
})

const pathDat = pathParse('M230 230A 45 45, 0, 1, 1, 275 275L 275 230 Z').absCairo({
  round: 2
})
const { segments } = pathDatas
// console.log('pathDatas', serializePath(pathDatas))
console.error('segments', segments)

// fill: #ddd, stroke: red, stroke-width: 2, stroke-linecap: "butt", fill-rule:nonzero
Parse('test.svg', {
  paths: [
    {
      d: segments,
      color: 'red',
      attributes: {
        fill: 'red',
        stroke: '#000',
        'stroke-width': 2,
        'stroke-linecap': 'butt'
      }
    },
    {
      d: pathDat.segments,
      attributes: {
        fill: 'green',
        stroke: '#fec',
        'stroke-width': '10',
        'stroke-linecap': 'round'
      }
    }
  ],
  size: 1024
}, (data, tips) => {
  console.error(data, tips)
})
