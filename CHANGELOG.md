# CHANGELOG

## 3.1.5

 - Fix deployment script.

## ~~3.1.4~~

**This version had been failed to deploy. So do not use this version.**

 - Tested on Node.js v10.15.2
 - Update dependencies.
   - `opentype.js`: `0.7.3` -> `0.11.0`

## 3.1.3

 - Tested on Node.js v6.11.1
 - Update dependencies.
   - `opentype.js`: `0.7.1` -> `0.7.3`

## 3.1.2

 - Pin opentype.js version to `0.7.1`. (see #25)

## 3.1.1

 - Tested on Node.js v6.10.3
 - Update dependencies.
   - `opentype.js`: `0.6.6` -> `0.7.1`

## 3.1.0

 - Support letter-spacing option.
 - Support tracking option.

## 3.0.1

 - Fix #10

## 3.0.0

 - Simplify module layout
   - Please use `const TextToSVG = require('text-to-svg');`<br>instead of `const TextToSVG = require('text-to-svg').TextToSVG;`
 - Add `loadSync` method.
   - Please use `const textToSVG = TextToSVG.loadSync();`<br>instead of `const textToSVG = new TextToSVG();`
 - Add `load` method for asynchronous font loading.
 - Add `getMetrics` method instead of `getSize` method.
 - Correct vertical anchor option.
   - Correct `top` and `bottom`.
   - Add `baseline`.
 - Add `width` and `height` attribute to SVG element.

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
