/**
 * Copyright (c) 2015 Hideki Shiro
 */

'use strict';

import path from 'path';
import fs from 'fs';
import assert from 'assert';
import opentype from 'opentype.js';

const DEFAULT_FONT = path.join(__dirname, '../fonts/ipag.ttf');

function parseAnchorOption(anchor) {
  let horizontal = anchor.match(/left|center|right/gi) || [];
  horizontal = horizontal.length == 0 ? 'left' : horizontal[0];

  let vertical = anchor.match(/top|bottom|middle/gi) || [];
  vertical = vertical.length == 0 ? 'bottom' : vertical[0];

  return {horizontal, vertical};
}

export default class TextToSVG {
  constructor(file = DEFAULT_FONT) {
    this.font = opentype.loadSync(file);
  }

  getSize(text, options = {}) {
    const fontSize = options.fontSize || 72;
    const kerning = 'kerning' in options ? options.kerning : true;
    const fontScale = 1 / this.font.unitsPerEm * fontSize;

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

    return {
      width,
      height: (this.font.ascender - this.font.descender) * fontScale,
      ascender: this.font.ascender * fontScale,
      descender: this.font.descender * fontScale
    };
  }

  getD(text, options = {}) {
    let x = options.x || 0;
    let y = options.y || 0;
    const fontSize = options.fontSize || 72;
    const kerning = 'kerning' in options ? options.kerning : true;
    const anchor = parseAnchorOption(options.anchor || '');

    const size = this.getSize(text, {fontSize, kerning});

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
        throw new Error(`Unknown anchor option: ${anchor.horizontal}`);
    }

    switch (anchor.vertical) {
      case 'top':
        y += size.ascender;
        break;
      case 'middle':
        y += size.height / 2;
        break;
      case 'bottom':
        y += size.descender;
        break;
      default:
        throw new Error(`Unknown anchor option: ${anchor.vertical}`);
    }

    const path = this.font.getPath(text, x, y, fontSize, {kerning});

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
    let svg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">';
    svg += this.getPath(text, options);
    svg += '</svg>';

    return svg;
  }
}
