'use strict';

var fs = require('fs');
var assert = require('assert');
var opentype = require('opentype.js');

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
  constructor(url) {
    let buf = fs.readFileSync(url);
    let ab = toArrayBuffer(buf);
    this.font = opentype.parse(ab);
  }

  getPath(text, x, y, fontSize, options) {
    let path = this.font.getPath(text, x, y, fontSize, options);
    let d = path.commands.map(cmd => cmdToSVG(cmd)).join(' ');
    return `<path d="${d}"/>`;
  }

  getSVG(text, x, y, fontSize, options) {
    let svg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">';
    svg += this.getPath(text, x, y, fontSize, options);
    svg += '</svg>';

    return svg;
  }
}
