# text-to-svg

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]

Convert text to SVG path.

```js
var TextToSVG = require('text-to-svg').TextToSVG;
var textToSVG = new TextToSVG();

var attributes = {fill: 'red', stroke: 'black'};
var options = {x: 0, y: 0, fontSize: 72, attributes: attributes};

var svg = textToSVG.getSVG('hello', options);

console.log(svg);
```

```xml
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <path fill="red" stroke="black" d="M 5.2734375 -54.0703125 L 10.6171875..."/>
</svg>
```

## Installation

```
$ npm install --save text-to-svg
```

## API

### `new TextToSVG(file = '...path of the default font...')`

Construct TextToSVG. The default font is [IPA font](http://ipafont.ipa.go.jp/).

 - `file`: The file path of the font. (`*ttf`, `*otf`)

### `TextToSVG.getD(text, options = {})`

Get the path data for `d` attribute of `path`.

 - `text`: Text to convert to SVG path.

Options is an optional object containing:

 - `x`: Horizontal position of the beginning of the text. (default: `0`)
 - `y`: Vertical position of the baseline of the text. (default: `0`)
 - `fontSize`: Size of the text (default: `72`).
 - `kerning`: if `true` takes kerning information into account (default: `true`)
 - `anchor`: Anchor of object in coordinate. `"top"` or `"bottom"`. (default: `"bottom"`)

### `TextToSVG.getPath(text, options = {})`

Get the `path` element of SVG.

 - `text`: Text to convert to SVG path.

Options is an optional object containing:

 - `x`: Horizontal position of the beginning of the text. (default: `0`)
 - `y`: Vertical position of the baseline of the text. (default: `0`)
 - `fontSize`: Size of the text (default: `72`).
 - `kerning`: if `true` takes kerning information into account (default: `true`)
 - `anchor`: Anchor of object in coordinate. `"top"` or `"bottom"`. (default: `"bottom"`)
 - `attributes`: Key-Value pairs of attributes of `path` element.

### `TextToSVG.getSVG(text, options = {})`

Get the SVG.

 - `text`: Text to convert to SVG path.

Options is an optional object containing:

 - `x`: Horizontal position of the beginning of the text. (default: `0`)
 - `y`: Vertical position of the baseline of the text. (default: `0`)
 - `fontSize`: Size of the text (default: `72`).
 - `kerning`: if `true` takes kerning information into account (default: `true`)
 - `anchor`: Anchor of object in coordinate. `"top"` or `"bottom"`. (default: `"bottom"`)
 - `attributes`: Key-Value pairs of attributes of `path` element.

## License

MIT

[npm-url]: https://npmjs.org/package/text-to-svg
[npm-image]: https://badge.fury.io/js/text-to-svg.svg
[travis-url]: https://travis-ci.org/shrhdk/text-to-svg
[travis-image]: https://travis-ci.org/shrhdk/text-to-svg.svg?branch=master
