## svg-cairo-ps

This is a small library to normalise SVG paths use cairo convert to PostScript (ps), Encapsulated PostScript (eps), PDF, SVG, PNG.

Note: this package works with [path data](https://www.w3.org/TR/SVG11/paths.html#PathData) strings and [Cairo](https://cairographics.org/),
not with full svg xml sources.

## Explain

```js
// cairo_move_to   cairo_rel_move_to ()   => M/m
// cairo_line_to   cairo_rel_line_to ()   => L/l、 H/h、V/v
// 弧形 cairo_arc()   cairo_arc_negative ()    => A/r
// 贝塞尔曲线 cairo_curve_to()   cairo_rel_curve_to ()    => C/c、Q/q、T/t、S/s
// cairo_close_path()   => Z/z
```

## Example

``` js
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
```


```js

// data construct
{
    d: [
      {
        "type": "M",
        "args": [
          971.55,
          361.72
        ]
      },
      {
        "type": "L",
        "args": [
          811.71,
          361.72
        ]
      },
      {
        "type": "L",
        "args": [
          811.71,
          311.37
        ]
      },
      {
        "type": "L",
        "args": [
          921.18,
          311.37
        ]
      },
      {
        "type": "A",
        "args": [
          39.96,
          39.96,
          0,
          0,
          0,
          961.14,
          271.41
        ]
      },
      {
        "type": "L",
        "args": [
          961.14,
          102.8
        ]
      },
      {
        "type": "A",
        "args": [
          39.96,
          39.96,
          0,
          0,
          0,
          921.18,
          62.86
        ]
      },
      {
        "type": "L",
        "args": [
          102.82,
          62.86
        ]
      }
    ]
}

```


## License

[MIT](./LICENSE)





