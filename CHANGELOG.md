# CHANGELOG

## 3.0.0

 - Simplify module layout
   - Please use `import TextToSVG from 'text-to-svg';`<br>or `const TextToSVG = require('text-to-svg').default;`<br>instead of `var TextToSVG = require('text-to-svg').TextToSVG;`
 - Correct vertical anchor option.
   - Correct `top` and `bottom`.
   - Add `baseline`.
 - Add `width` and `height` attribute to SVG element.
 - Add `ascender` and `descender` to result of `getSize` method.

## 2.2.2

 - Tested on Node.js v5.3.0
 - Update dependencies.
   - `opentype.js`: `0.5.0` -> `0.6.0`

## 2.2.1

 - Tested on Node.js v4.2.1
 - Update dependencies.
 - Command line tool shows help when args are not provided.
 - Fix API document.

## 2.2.0

 - Add `getSize` method.
 - Add `anchor` option.
   - `left`, `center` , `right`, `top`, `middle`, `bottom`
 - Add command line tool.

## 2.1.0

 - Add `anchor` option.

## 2.0.2

 - Fix index.js

## 2.0.1

 - Include index.js to npm files.

## 2.0.0

 - Reform the API.
 - Include default font.
 - Remove the command line tool.

## 1.1.0

 - Add TextToSVG.getD(text, x, y, fontSize, options);

## 1.0.0

initial release
