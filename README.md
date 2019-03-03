# text-to-svg

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]

Convert text to SVG path without native dependence.

```js
const TextToSVG = require('text-to-svg');
const textToSVG = TextToSVG.loadSync();

const attributes = {fill: 'red', stroke: 'black'};
const options = {x: 0, y: 0, fontSize: 72, anchor: 'top', attributes: attributes};

const svg = textToSVG.getSVG('hello', options);

console.log(svg);
```

```xml
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="180" height="72">
  <path fill="red" stroke="black" d="M5.27 9.28L10.62 9.28L10.62 29.36Q15.86 24.12 21.02 24.12Q26.89 24.12 29.60 29.29Q31.11 32.20 31.11 36.35L31.11 59.70L25.77 59.70L25.77 37.93Q25.77 29.21 20.18 29.21Q16.42 29.21 13.57 31.96Q10.62 34.91 10.62 38.71L10.62 59.70L5.27 59.70L5.27 9.28ZM67.68 49.08Q64.55 61.10 54.07 61.10Q47.57 61.10 43.77 55.69Q40.32 50.73 40.32 42.61Q40.32 34.84 43.56 29.88Q47.36 24.12 54 24.12Q66.97 24.12 67.82 43.70L45.74 43.70Q46.16 56.29 54.14 56.29Q60.47 56.29 62.05 49.08L67.68 49.08M62.05 39.09Q60.89 28.93 54 28.93Q47.36 28.93 45.95 39.09L62.05 39.09ZM92.81 51.82Q92.81 54.91 95.77 54.91Q98.19 54.91 101.07 54.35L101.07 59.73Q96.82 60.33 94.82 60.33Q87.19 60.33 87.19 52.84L87.19 9.28L92.81 9.28L92.81 51.82ZM128.81 51.82Q128.81 54.91 131.77 54.91Q134.19 54.91 137.07 54.35L137.07 59.73Q132.82 60.33 130.82 60.33Q123.19 60.33 123.19 52.84L123.19 9.28L128.81 9.28L128.81 51.82ZM162.07 24.12Q168.68 24.12 172.44 29.95Q175.68 34.80 175.68 42.61Q175.68 48.48 173.74 52.91Q170.16 61.14 161.93 61.14Q155.57 61.14 151.77 55.72Q148.32 50.77 148.32 42.61Q148.32 33.82 152.30 28.79Q156.09 24.12 162.07 24.12M161.93 29.14Q158.06 29.14 155.88 33.19Q153.95 36.74 153.95 42.61Q153.95 48.02 155.53 51.43Q157.71 56.11 162 56.11Q165.94 56.11 168.12 52.07Q170.05 48.52 170.05 42.68Q170.05 36.60 168.05 33.12Q165.90 29.14 161.93 29.14Z"/>
</svg>
```

## Installation

```
$ npm install --save text-to-svg
```

## Constructor

An example for loading default font synchronously. The default font is [IPA font](http://ipafont.ipa.go.jp/). ** This method only works on Node.js. **

```js
const textToSVG = TextToSVG.loadSync();
const svg = textToSVG.getSVG('hello');
console.log(svg);
```

An example for loading font synchronously. ** This method only works on Node.js. **

```js
// Argument is file path (NOT URL)
const textToSVG = TextToSVG.loadSync('/fonts/Noto-Sans.otf');
const svg = textToSVG.getSVG('hello');
console.log(svg);
```

An example for loading font asynchronously.

```js
// First argument is URL on web browsers, but it is file path on Node.js.
TextToSVG.load('/fonts/Noto-Sans.otf', function(err, textToSVG) {
    const svg = textToSVG.getSVG('hello');
    console.log(svg);
});
```

## API

### `TextToSVG.getD(text, options = {})`

Get the path data for `d` attribute of `path`.

 - `text`: Text to convert to SVG path.

Options is an optional object containing:

 - `x`: Horizontal position of the beginning of the text. (default: `0`)
 - `y`: Vertical position of the baseline of the text. (default: `0`)
 - `fontSize`: Size of the text (default: `72`).
 - `kerning`: if `true` takes kerning information into account (default: `true`)
 - `letterSpacing`: letter-spacing value in `em`.
 - `tracking`: tracking value. (em / 1000)
 - `anchor`: Anchor of object in coordinate. (default: `'left baseline'`)
   - (`left`, `center`, `right`) + (`baseline`, `top`, `middle`, `bottom`)

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
 - `letterSpacing`: letter-spacing value in `em`.
 - `tracking`: tracking value. (em / 1000)
 - `anchor`: Anchor of object in coordinate. (default: `'left baseline'`)
   - (`left`, `center`, `right`) + (`baseline`, `top`, `middle`, `bottom`)
 - `attributes`: Key-Value pairs of attributes of `path` element.

Return value example

```xml
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
 - `letterSpacing`: letter-spacing value in `em`.
 - `tracking`: tracking value. (em / 1000)
 - `anchor`: Anchor of object in coordinate. (default: `'left baseline'`)
   - (`left`, `center`, `right`) + (`baseline`, `top`, `middle`, `bottom`)
 - `attributes`: Key-Value pairs of attributes of `path` element.

Return value example

```xml
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path fill="red" stroke="black" d="M5.27-54.07L10.62-54.07L10.62-34.00Q15.86-39.23 21.02-39.23Q26.89-39.23 29.60-34.07Q31.11-31.15 31.11-27L31.11-3.66L25.77-3.66L25.77-25.42Q25.77-34.14 20.18-34.14Q16.42-34.14 13.57-31.39Q10.62-28.44 10.62-24.64L10.62-3.66L5.27-3.66L5.27-54.07ZM67.68-14.27Q64.55-2.25 54.07-2.25Q47.57-2.25 43.77-7.66Q40.32-12.62 40.32-20.74Q40.32-28.51 43.56-33.47Q47.36-39.23 54-39.23Q66.97-39.23 67.82-19.65L45.74-19.65Q46.16-7.07 54.14-7.07Q60.47-7.07 62.05-14.27L67.68-14.27M62.05-24.26Q60.89-34.42 54-34.42Q47.36-34.42 45.95-24.26L62.05-24.26ZM92.81-11.53Q92.81-8.44 95.77-8.44Q98.19-8.44 101.07-9L101.07-3.62Q96.82-3.02 94.82-3.02Q87.19-3.02 87.19-10.51L87.19-54.07L92.81-54.07L92.81-11.53ZM128.81-11.53Q128.81-8.44 131.77-8.44Q134.19-8.44 137.07-9L137.07-3.62Q132.82-3.02 130.82-3.02Q123.19-3.02 123.19-10.51L123.19-54.07L128.81-54.07L128.81-11.53ZM162.07-39.23Q168.68-39.23 172.44-33.40Q175.68-28.55 175.68-20.74Q175.68-14.87 173.74-10.44Q170.16-2.21 161.93-2.21Q155.57-2.21 151.77-7.63Q148.32-12.59 148.32-20.74Q148.32-29.53 152.30-34.56Q156.09-39.23 162.07-39.23M161.93-34.21Q158.06-34.21 155.88-30.16Q153.95-26.61 153.95-20.74Q153.95-15.33 155.53-11.92Q157.71-7.24 162-7.24Q165.94-7.24 168.12-11.29Q170.05-14.84 170.05-20.67Q170.05-26.75 168.05-30.23Q165.90-34.21 161.93-34.21Z"/></svg>
```

### `TextToSVG.getMetrics(text, option = {})`

Measure text size.

 - `text`: Text to measure size.

Options is an optional object containing:

 - `x`: Horizontal position of the beginning of the text. (default: `0`)
 - `y`: Vertical position of the baseline of the text. (default: `0`)
 - `fontSize`: Size of the text (default: `72`).
 - `kerning`: if `true` takes kerning information into account (default: `true`)
 - `letterSpacing`: letter-spacing value in `em`.
 - `tracking`: tracking value. (em / 1000)
 - `anchor`: Anchor of object in coordinate. (default: `'left baseline'`)

An example of return value.

```json
{
  "x": 0,
  "y": -63.3515625,
  "baseline": 0,
  "width": 180,
  "height": 72,
  "ascender": 63.3515625,
  "descender": -8.6484375
}
```

## License

MIT

## Credits

text-to-svg depends on the following softwares. I thank great authors a lot.

- [opentype.js](https://github.com/nodebox/opentype.js): Copyright (c) 2015 Frederik De Bleser
- [commander](https://github.com/tj/commander.js): Copyright (c) 2011 TJ Holowaychuk <tj@vision-media.ca>

These are released under the [MIT license](https://opensource.org/licenses/MIT)

[npm-url]: https://npmjs.org/package/text-to-svg
[npm-image]: https://badge.fury.io/js/text-to-svg.svg
[travis-url]: https://travis-ci.org/shrhdk/text-to-svg
[travis-image]: https://travis-ci.org/shrhdk/text-to-svg.svg?branch=master
[gitter-url]: https://gitter.im/shrhdk/text-to-svg
[gitter-image]: https://badges.gitter.im/Join%20Chat.svg
