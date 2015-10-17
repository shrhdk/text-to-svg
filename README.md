# text-to-svg

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][dependency-image]][dependency-url] [![Gitter][gitter-image]][gitter-url]

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
  <path fill="red" stroke="black" d="M5.27-54.07L10.62-54.07L10.62-34.00Q15.86-39.23 21.02-39.23Q26.89-39.23 29.60-34.07Q31.11-31.15 31.11-27L31.11-3.66L25.77-3.66L25.77-25.42Q25.77-34.14 20.18-34.14Q16.42-34.14 13.57-31.39Q10.62-28.44 10.62-24.64L10.62-3.66L5.27-3.66L5.27-54.07ZM67.68-14.27Q64.55-2.25 54.07-2.25Q47.57-2.25 43.77-7.66Q40.32-12.62 40.32-20.74Q40.32-28.51 43.56-33.47Q47.36-39.23 54-39.23Q66.97-39.23 67.82-19.65L45.74-19.65Q46.16-7.07 54.14-7.07Q60.47-7.07 62.05-14.27L67.68-14.27M62.05-24.26Q60.89-34.42 54-34.42Q47.36-34.42 45.95-24.26L62.05-24.26ZM92.81-11.53Q92.81-8.44 95.77-8.44Q98.19-8.44 101.07-9L101.07-3.62Q96.82-3.02 94.82-3.02Q87.19-3.02 87.19-10.51L87.19-54.07L92.81-54.07L92.81-11.53ZM128.81-11.53Q128.81-8.44 131.77-8.44Q134.19-8.44 137.07-9L137.07-3.62Q132.82-3.02 130.82-3.02Q123.19-3.02 123.19-10.51L123.19-54.07L128.81-54.07L128.81-11.53ZM162.07-39.23Q168.68-39.23 172.44-33.40Q175.68-28.55 175.68-20.74Q175.68-14.87 173.74-10.44Q170.16-2.21 161.93-2.21Q155.57-2.21 151.77-7.63Q148.32-12.59 148.32-20.74Q148.32-29.53 152.30-34.56Q156.09-39.23 162.07-39.23M161.93-34.21Q158.06-34.21 155.88-30.16Q153.95-26.61 153.95-20.74Q153.95-15.33 155.53-11.92Q157.71-7.24 162-7.24Q165.94-7.24 168.12-11.29Q170.05-14.84 170.05-20.67Q170.05-26.75 168.05-30.23Q165.90-34.21 161.93-34.21Z"/>
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
 - `anchor`: Anchor of object in coordinate. (default: `'bottom left'`)
   - (`top`, `middle`, `bottom`) + (`left`, `center`, `right`)

Return value example

```
M5.27-54.07L10.62-54.07L10.62-34.00Q15.86-39.23 21.02-39.23Q26.89-39.23 29.60-34.07Q31.11-31.15 31.11-27L31.11-3.66L25.77-3.66L25.77-25.42Q25.77-34.14 20.18-34.14Q16.42-34.14 13.57-31.39Q10.62-28.44 10.62-24.64L10.62-3.66L5.27-3.66L5.27-54.07ZM67.68-14.27Q64.55-2.25 54.07-2.25Q47.57-2.25 43.77-7.66Q40.32-12.62 40.32-20.74Q40.32-28.51 43.56-33.47Q47.36-39.23 54-39.23Q66.97-39.23 67.82-19.65L45.74-19.65Q46.16-7.07 54.14-7.07Q60.47-7.07 62.05-14.27L67.68-14.27M62.05-24.26Q60.89-34.42 54-34.42Q47.36-34.42 45.95-24.26L62.05-24.26ZM92.81-11.53Q92.81-8.44 95.77-8.44Q98.19-8.44 101.07-9L101.07-3.62Q96.82-3.02 94.82-3.02Q87.19-3.02 87.19-10.51L87.19-54.07L92.81-54.07L92.81-11.53ZM128.81-11.53Q128.81-8.44 131.77-8.44Q134.19-8.44 137.07-9L137.07-3.62Q132.82-3.02 130.82-3.02Q123.19-3.02 123.19-10.51L123.19-54.07L128.81-54.07L128.81-11.53ZM162.07-39.23Q168.68-39.23 172.44-33.40Q175.68-28.55 175.68-20.74Q175.68-14.87 173.74-10.44Q170.16-2.21 161.93-2.21Q155.57-2.21 151.77-7.63Q148.32-12.59 148.32-20.74Q148.32-29.53 152.30-34.56Q156.09-39.23 162.07-39.23M161.93-34.21Q158.06-34.21 155.88-30.16Q153.95-26.61 153.95-20.74Q153.95-15.33 155.53-11.92Q157.71-7.24 162-7.24Q165.94-7.24 168.12-11.29Q170.05-14.84 170.05-20.67Q170.05-26.75 168.05-30.23Q165.90-34.21 161.93-34.21Z
```

### `TextToSVG.getPath(text, options = {})`

Get the `path` element of SVG.

 - `text`: Text to convert to SVG path.

Options is an optional object containing:

 - `x`: Horizontal position of the beginning of the text. (default: `0`)
 - `y`: Vertical position of the baseline of the text. (default: `0`)
 - `fontSize`: Size of the text (default: `72`).
 - `kerning`: if `true` takes kerning information into account (default: `true`)
 - `anchor`: Anchor of object in coordinate. (default: `'bottom left'`)
   - (`top`, `middle`, `bottom`) + (`left`, `center`, `right`)
 - `attributes`: Key-Value pairs of attributes of `path` element.

Return value example

```
<path fill="red" stroke="black" d="M5.27-54.07L10.62-54.07L10.62-34.00Q15.86-39.23 21.02-39.23Q26.89-39.23 29.60-34.07Q31.11-31.15 31.11-27L31.11-3.66L25.77-3.66L25.77-25.42Q25.77-34.14 20.18-34.14Q16.42-34.14 13.57-31.39Q10.62-28.44 10.62-24.64L10.62-3.66L5.27-3.66L5.27-54.07ZM67.68-14.27Q64.55-2.25 54.07-2.25Q47.57-2.25 43.77-7.66Q40.32-12.62 40.32-20.74Q40.32-28.51 43.56-33.47Q47.36-39.23 54-39.23Q66.97-39.23 67.82-19.65L45.74-19.65Q46.16-7.07 54.14-7.07Q60.47-7.07 62.05-14.27L67.68-14.27M62.05-24.26Q60.89-34.42 54-34.42Q47.36-34.42 45.95-24.26L62.05-24.26ZM92.81-11.53Q92.81-8.44 95.77-8.44Q98.19-8.44 101.07-9L101.07-3.62Q96.82-3.02 94.82-3.02Q87.19-3.02 87.19-10.51L87.19-54.07L92.81-54.07L92.81-11.53ZM128.81-11.53Q128.81-8.44 131.77-8.44Q134.19-8.44 137.07-9L137.07-3.62Q132.82-3.02 130.82-3.02Q123.19-3.02 123.19-10.51L123.19-54.07L128.81-54.07L128.81-11.53ZM162.07-39.23Q168.68-39.23 172.44-33.40Q175.68-28.55 175.68-20.74Q175.68-14.87 173.74-10.44Q170.16-2.21 161.93-2.21Q155.57-2.21 151.77-7.63Q148.32-12.59 148.32-20.74Q148.32-29.53 152.30-34.56Q156.09-39.23 162.07-39.23M161.93-34.21Q158.06-34.21 155.88-30.16Q153.95-26.61 153.95-20.74Q153.95-15.33 155.53-11.92Q157.71-7.24 162-7.24Q165.94-7.24 168.12-11.29Q170.05-14.84 170.05-20.67Q170.05-26.75 168.05-30.23Q165.90-34.21 161.93-34.21Z"/>
```

### `TextToSVG.getSVG(text, options = {})`

Get the SVG.

 - `text`: Text to convert to SVG path.

Options is an optional object containing:

 - `x`: Horizontal position of the beginning of the text. (default: `0`)
 - `y`: Vertical position of the baseline of the text. (default: `0`)
 - `fontSize`: Size of the text (default: `72`).
 - `kerning`: if `true` takes kerning information into account (default: `true`)
 - `anchor`: Anchor of object in coordinate. (default: `'bottom left'`)
   - (`top`, `middle`, `bottom`) + (`left`, `center`, `right`)
 - `attributes`: Key-Value pairs of attributes of `path` element.

Return value example

```
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path fill="red" stroke="black" d="M5.27-54.07L10.62-54.07L10.62-34.00Q15.86-39.23 21.02-39.23Q26.89-39.23 29.60-34.07Q31.11-31.15 31.11-27L31.11-3.66L25.77-3.66L25.77-25.42Q25.77-34.14 20.18-34.14Q16.42-34.14 13.57-31.39Q10.62-28.44 10.62-24.64L10.62-3.66L5.27-3.66L5.27-54.07ZM67.68-14.27Q64.55-2.25 54.07-2.25Q47.57-2.25 43.77-7.66Q40.32-12.62 40.32-20.74Q40.32-28.51 43.56-33.47Q47.36-39.23 54-39.23Q66.97-39.23 67.82-19.65L45.74-19.65Q46.16-7.07 54.14-7.07Q60.47-7.07 62.05-14.27L67.68-14.27M62.05-24.26Q60.89-34.42 54-34.42Q47.36-34.42 45.95-24.26L62.05-24.26ZM92.81-11.53Q92.81-8.44 95.77-8.44Q98.19-8.44 101.07-9L101.07-3.62Q96.82-3.02 94.82-3.02Q87.19-3.02 87.19-10.51L87.19-54.07L92.81-54.07L92.81-11.53ZM128.81-11.53Q128.81-8.44 131.77-8.44Q134.19-8.44 137.07-9L137.07-3.62Q132.82-3.02 130.82-3.02Q123.19-3.02 123.19-10.51L123.19-54.07L128.81-54.07L128.81-11.53ZM162.07-39.23Q168.68-39.23 172.44-33.40Q175.68-28.55 175.68-20.74Q175.68-14.87 173.74-10.44Q170.16-2.21 161.93-2.21Q155.57-2.21 151.77-7.63Q148.32-12.59 148.32-20.74Q148.32-29.53 152.30-34.56Q156.09-39.23 162.07-39.23M161.93-34.21Q158.06-34.21 155.88-30.16Q153.95-26.61 153.95-20.74Q153.95-15.33 155.53-11.92Q157.71-7.24 162-7.24Q165.94-7.24 168.12-11.29Q170.05-14.84 170.05-20.67Q170.05-26.75 168.05-30.23Q165.90-34.21 161.93-34.21Z"/></svg>
```

### `TextToSVG.getSize(text, option = {})`

Measure text size.

 - `text`: Text to measure size.

Options is an optional object containing:

 - `fontSize`: Size of the text (default: `72`).
 - `kerning`: if `true` takes kerning information into account (default: `true`)

Return value example

```js
{width: 100, height: 20}
```

## License

MIT

[npm-url]: https://npmjs.org/package/text-to-svg
[npm-image]: https://badge.fury.io/js/text-to-svg.svg
[travis-url]: https://travis-ci.org/shrhdk/text-to-svg
[travis-image]: https://travis-ci.org/shrhdk/text-to-svg.svg?branch=master
[dependency-url]: https://gemnasium.com/shrhdk/text-to-svg
[dependency-image]: https://gemnasium.com/shrhdk/text-to-svg.svg
[gitter-url]: https://gitter.im/shrhdk/text-to-svg
[gitter-image]: https://badges.gitter.im/Join%20Chat.svg
