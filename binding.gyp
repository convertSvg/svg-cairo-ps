{
  "targets": [
    {
      "target_name": "parse",
      "sources": [ "./lib/parse.cc" ],
      'libraries': [
        '<!@(pkg-config cairo --libs)',
        '<!@(pkg-config libpng --libs)'
      ],
      "include_dirs": ['<!@(pkg-config cairo --cflags-only-I | sed s/-I//g)', '<!@(pkg-config libpng --cflags-only-I | sed s/-I//g)',],
    }
  ]
}
