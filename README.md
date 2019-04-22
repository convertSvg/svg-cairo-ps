## svg-cairo-ps

This is a small library to normalise SVG paths use cairo convert to postscript.

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





