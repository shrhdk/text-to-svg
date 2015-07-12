/**
 * Copyright (c) 2015 Hideki Shiro
 */

'use strict';

var path = require('path');
var fs = require('fs');
var assert = require('assert');
var opentype = require('opentype.js');

const DEFAULT_FONT = path.join(__dirname, '../fonts/ipag.ttf');

function toArrayBuffer(buffer) {
  var ab = new ArrayBuffer(buffer.length);
  var view = new Uint8Array(ab);
  for (var i = 0; i < buffer.length; ++i) {
    view[i] = buffer[i];
  }
  return ab;
}

function cmdToSVG(cmd) {
  switch (cmd.type) {
    case 'M':
      return `M ${cmd.x} ${cmd.y}`;
    case 'L':
      return `L ${cmd.x} ${cmd.y}`;
    case 'C':
      return `C ${cmd.x1} ${cmd.y1} ${cmd.x2} ${cmd.y2} ${cmd.x} ${cmd.y}`;
    case 'Q':
      return `Q ${cmd.x1} ${cmd.y1} ${cmd.x} ${cmd.y}`;
    case 'Z':
      return 'Z';
    default:
      assert('Unknown Command: ' + cmd);
  }
}

export class TextToSVG {
  constructor(file = DEFAULT_FONT) {
    let buf = fs.readFileSync(file);
    let ab = toArrayBuffer(buf);
    this.font = opentype.parse(ab);
  }

  getD(text, options = {}) {
    let x = options.x || 0;
    let y = options.y || 0;
    let fontSize = options.fontSize || 72;
    let kerning = 'kerning' in options ? options.kerning : true;

    let yAnchor = options.anchor || "bottom";
    switch (yAnchor) {
      case "top":
        y += this.font.ascender / this.font.unitsPerEm * fontSize;
        break;
      case "bottom":
        y += 0;
        break;
      default:
        throw new Error("Unknown anchor option: " + yAnchor);
    }

    let path = this.font.getPath(text, x, y, fontSize, {kerning});
    return path.commands.map(cmd => cmdToSVG(cmd)).join(' ');
  }

  getPath(text, options = {}) {
    options.attributes = options.attributes || {};

    let attributes = Object.keys(options.attributes).map((key) => `${key}="${options.attributes[key]}"`).join(' ');
    let d = this.getD(text, options);

    if (attributes) {
      return `<path ${attributes} d="${d}"/>`;
    } else {
      return `<path d="${d}"/>`;
    }
  }

  getSVG(text, options = {}) {
    let svg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">';
    svg += this.getPath(text, options);
    svg += '</svg>';

    return svg;
  }
}
