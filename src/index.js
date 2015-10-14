/**
 * Copyright (c) 2015 Hideki Shiro
 */

'use strict';

var path = require('path');
var fs = require('fs');
var assert = require('assert');
var opentype = require('opentype.js');

const DEFAULT_FONT = path.join(__dirname, '../fonts/ipag.ttf');

function parseAnchorOption(anchor) {
  let horizontal = anchor.match(/left|center|right/gi) || [];
  horizontal = horizontal.length == 0 ? 'left' : horizontal[0];

  let vertical = anchor.match(/top|bottom|middle/gi) || [];
  vertical = vertical.length == 0 ? 'bottom' : vertical[0];

  return {horizontal, vertical};
}

export class TextToSVG {
  constructor(file = DEFAULT_FONT) {
    this.font = opentype.loadSync(file);
  }

  getSize(text, options = {}) {
    let fontSize = options.fontSize || 72;
    let kerning = 'kerning' in options ? options.kerning : true;

    let fontScale = 1 / this.font.unitsPerEm * fontSize;

    let width = 0;
    let glyphs = this.font.stringToGlyphs(text);
    for (let i = 0; i < glyphs.length; i++) {
      let glyph = glyphs[i];

      if (glyph.advanceWidth) {
        width += glyph.advanceWidth * fontScale;
      }

      if (kerning && i < glyphs.length - 1) {
        let kerningValue = this.font.getKerningValue(glyph, glyphs[i + 1]);
        width += kerningValue * fontScale;
      }
    }

    let height = (this.font.ascender + this.font.descender) * fontScale;

    return {width, height};
  }

  getD(text, options = {}) {
    let x = options.x || 0;
    let y = options.y || 0;
    let fontSize = options.fontSize || 72;
    let kerning = 'kerning' in options ? options.kerning : true;
    let anchor = parseAnchorOption(options.anchor || '');

    let size = this.getSize(text, {fontSize, kerning});

    switch (anchor.horizontal) {
      case 'left':
        x -= 0;
        break;
      case 'center':
        x -= size.width / 2;
        break;
      case 'right':
        x -= size.width;
        break;
      default:
        throw new Error("Unknown anchor option: " + anchor.horizontal);
    }

    switch (anchor.vertical) {
      case 'top':
        y += size.height;
        break;
      case 'middle':
        y += size.height / 2;
        break;
      case 'bottom':
        y += 0;
        break;
      default:
        throw new Error("Unknown anchor option: " + anchor.vertical);
    }

    let path = this.font.getPath(text, x, y, fontSize, {kerning});

    return path.toPathData();
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
