/**
 * Copyright (c) 2016 Hideki Shiro
 */

'use strict';

import path from 'path';
import fs from 'fs';
import assert from 'assert';
import opentype from 'opentype.js';

const DEFAULT_FONT = path.join(__dirname, '../fonts/ipag.ttf');

export default class TextToSVG {
  constructor(font) {
    this.font = font;
  }

  static loadSync(file = DEFAULT_FONT) {
    return new TextToSVG(opentype.loadSync(file));
  }

  static load(url, cb) {
    opentype.load(url, (err, font) => {
      if (err != null) {
        return cb(err, null)
      }

      return cb(null, new TextToSVG(font));
    });
  }

  getSize(text, options = {}) {
    let x = options.x || 0;
    let y = options.y || 0;
    const fontSize = options.fontSize || 72;
    const kerning = 'kerning' in options ? options.kerning : true;
    const fontScale = 1 / this.font.unitsPerEm * fontSize;
    const anchor = TextToSVG._parseAnchorOption(options.anchor || '');

    const width = this._getWidth(text, fontScale, kerning);
    const height = (this.font.ascender - this.font.descender) * fontScale;
    const ascender = this.font.ascender * fontScale;
    const descender = this.font.descender * fontScale;

    switch (anchor.horizontal) {
      case 'left':
        x += 0;
        break;
      case 'center':
        x -= width / 2;
        break;
      case 'right':
        x -= width;
        break;
      default:
        throw new Error(`Unknown anchor option: ${anchor.horizontal}`);
    }

    switch (anchor.vertical) {
      case 'baseline':
        y -= ascender;
        break;
      case 'top':
        y -= 0;
        break;
      case 'middle':
        y -= height / 2;
        break;
      case 'bottom':
        y -= height;
        break;
      default:
        throw new Error(`Unknown anchor option: ${anchor.vertical}`);
    }

    const baseline = y + ascender;

    return {
      x, y, baseline, width, height,
      ascender, descender
    };
  }

  getD(text, options = {}) {
    let x = options.x || 0;
    let y = options.y || 0;
    const fontSize = options.fontSize || 72;
    const kerning = 'kerning' in options ? options.kerning : true;
    const anchor = TextToSVG._parseAnchorOption(options.anchor || '');
    const size = this.getSize(text, options);
    const path = this.font.getPath(text, size.x, size.baseline, fontSize, { kerning });

    return path.toPathData();
  }

  getPath(text, options = {}) {
    options.attributes = options.attributes || {};

    const attributes = Object.keys(options.attributes).map((key) => `${key}="${options.attributes[key]}"`).join(' ');
    const d = this.getD(text, options);

    if (attributes) {
      return `<path ${attributes} d="${d}"/>`;
    } else {
      return `<path d="${d}"/>`;
    }
  }

  getSVG(text, options = {}) {
    const size = this.getSize(text, options)
    let svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${size.width}" height="${size.height}">`;
    svg += this.getPath(text, options);
    svg += '</svg>';

    return svg;
  }

  getDebugSVG(text, options = {}) {
    options.x = options.x || 0;
    options.y = options.y || 0;
    const size = this.getSize(text, options);
    const box = {
      width: Math.max(size.x + size.width, 0) - Math.min(size.x, 0),
      height: Math.max(size.y + size.height, 0) - Math.min(size.y, 0)
    };
    const origin = {
      x: box.width - Math.max(size.x + size.width, 0),
      y: box.height - Math.max(size.y + size.height, 0)
    }

    // Shift text based on origin
    options.x += origin.x;
    options.y += origin.y;

    let svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${box.width}" height="${box.height}">`;
    svg += `<path fill="none" stroke="red" stroke-width="1" d="M0,${origin.y}L${box.width},${origin.y}"/>` // X Axis
    svg += `<path fill="none" stroke="red" stroke-width="1" d="M${origin.x},0L${origin.x},${box.height}"/>` // Y Axis
    svg += this.getPath(text, options);
    svg += '</svg>';

    return svg;
  }

  _getWidth(text, fontScale, kerning) {
    let width = 0;
    const glyphs = this.font.stringToGlyphs(text);
    for (let i = 0; i < glyphs.length; i++) {
      const glyph = glyphs[i];

      if (glyph.advanceWidth) {
        width += glyph.advanceWidth * fontScale;
      }

      if (kerning && i < glyphs.length - 1) {
        const kerningValue = this.font.getKerningValue(glyph, glyphs[i + 1]);
        width += kerningValue * fontScale;
      }
    }
    return width;
  }

  static _parseAnchorOption(anchor) {
    let horizontal = anchor.match(/left|center|right/gi) || [];
    horizontal = horizontal.length === 0 ? 'left' : horizontal[0];

    let vertical = anchor.match(/baseline|top|bottom|middle/gi) || [];
    vertical = vertical.length === 0 ? 'baseline' : vertical[0];

    return { horizontal, vertical };
  }
}

module.exports = exports['default'];
