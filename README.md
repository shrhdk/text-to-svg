# text-to-svg

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]

Convert text to SVG path.

## Use as Command

```
$ npm install -g text-to-svg
$ text-to-svg --text 'Hello World' --size 20 > hello.svg
```

## Use as Lib

Install

```
$ npm install --save text-to-svg
```

Example

```
var TextToSVG = require('text-to-svg').TextToSVG;
var textToSVG = new TextToSVG('./fonts/example.ttf');

var x = 0, y = 0, fontSize = 18;

var path = textToSVG.getPath('Hello World', x, y, fontSize);
console.log(path);

var svg = textToSVG.getSVG('Hello World', x, y, fontSize);
console.log(svg);
```

Output

```
<path d="<path d="M 1.0986328125 -13.517578125 L 2.5400390625 -13.517578125...
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M 1.0986...
```

## License

MIT

[npm-url]: https://npmjs.org/package/text-to-svg
[npm-image]: https://badge.fury.io/js/text-to-svg.svg
[travis-url]: https://travis-ci.org/shrhdk/text-to-svg
[travis-image]: https://travis-ci.org/shrhdk/text-to-svg.svg?branch=master
