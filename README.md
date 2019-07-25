## svg-cairo-ps

This is a small library to normalise SVG paths use cairo convert to PostScript (ps), Encapsulated PostScript (eps), PDF, SVG, PNG.

Note: this package works with [path data](https://www.w3.org/TR/SVG11/paths.html#PathData) strings, [Cairo](https://cairographics.org/) and [CairoSVG](https://github.com/Kozea/CairoSVG),
not with full svg xml sources.

## Install 

```
npm install svg-cairo-ps
```

By default, binaries for macOS, Linux and Windows will be downloaded. If you want to build from source, use `npm install --build-from-source` and see the **Compiling** section below.

The minimum version of Node.js required is **6.0.0**.

### Compiling

If you don't have a supported OS or processor architecture, or you use `--build-from-source`, the module will be compiled on your system. This requires several dependencies, including Cairo and Pango.

For detailed installation information, reference material the [wiki](https://github.com/Automattic/node-canvas/wiki/_pages). One-line installation instructions for common OSes are below. 

OS | Command
----- | -----
OS X | Using [Homebrew](https://brew.sh/):<br/>`brew install pkg-config cairo libpng jpeg`
Ubuntu | `sudo apt-get install build-essential libcairo2-dev  libjpeg-dev libpng-dev`
Fedora | `sudo yum install gcc-c++ cairo-devel libjpeg-turbo-devel`
Solaris | `pkgin install cairo pkg-config xproto renderproto kbproto xextproto`
OpenBSD | `doas pkg_add cairo png jpeg`
Windows | Reference material the [wiki](https://github.com/Automattic/node-canvas/wiki/Installation:-Windows)
Others | Reference material the [wiki](https://github.com/Automattic/node-canvas/wiki)

**Mac OS X v10.11+:** If you have recently updated to Mac OS X v10.11+ and are experiencing trouble when compiling, run the following command: `xcode-select --install`. Read more about the problem [on Stack Overflow](http://stackoverflow.com/a/32929012/148072).
If you have xcode 10.0 or higher installed, in order to build from source you need NPM 6.4.1 or higher.

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
const Parse = require('svg-cairo-ps')
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
      // support fill, stroke, stroke-width, stroke-linecap, fill-rule
      attributes: {
        fill: 'red',
        'fill-rule': 'nonzero',
        stroke: '#000',
        'stroke-width': 2,
        'stroke-linecap': 'butt'
      }
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





