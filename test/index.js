/**
 * Copyright (c) 2015 Hideki Shiro
 */

'use strict';

var assert = require('assert');

var TextToSVG = require('../src/index.js').TextToSVG;
var textToSVG = new TextToSVG('fonts/ipag.ttf');

const D_HELLO_0_0_72_KERNING = 'M5.27-54.07L10.62-54.07L10.62-34.00Q15.86-39.23 21.02-39.23Q26.89-39.23 29.60-34.07Q31.11-31.15 31.11-27L31.11-3.66L25.77-3.66L25.77-25.42Q25.77-34.14 20.18-34.14Q16.42-34.14 13.57-31.39Q10.62-28.44 10.62-24.64L10.62-3.66L5.27-3.66L5.27-54.07ZM67.68-14.27Q64.55-2.25 54.07-2.25Q47.57-2.25 43.77-7.66Q40.32-12.62 40.32-20.74Q40.32-28.51 43.56-33.47Q47.36-39.23 54-39.23Q66.97-39.23 67.82-19.65L45.74-19.65Q46.16-7.07 54.14-7.07Q60.47-7.07 62.05-14.27L67.68-14.27M62.05-24.26Q60.89-34.42 54-34.42Q47.36-34.42 45.95-24.26L62.05-24.26ZM92.81-11.53Q92.81-8.44 95.77-8.44Q98.19-8.44 101.07-9L101.07-3.62Q96.82-3.02 94.82-3.02Q87.19-3.02 87.19-10.51L87.19-54.07L92.81-54.07L92.81-11.53ZM128.81-11.53Q128.81-8.44 131.77-8.44Q134.19-8.44 137.07-9L137.07-3.62Q132.82-3.02 130.82-3.02Q123.19-3.02 123.19-10.51L123.19-54.07L128.81-54.07L128.81-11.53ZM162.07-39.23Q168.68-39.23 172.44-33.40Q175.68-28.55 175.68-20.74Q175.68-14.87 173.74-10.44Q170.16-2.21 161.93-2.21Q155.57-2.21 151.77-7.63Q148.32-12.59 148.32-20.74Q148.32-29.53 152.30-34.56Q156.09-39.23 162.07-39.23M161.93-34.21Q158.06-34.21 155.88-30.16Q153.95-26.61 153.95-20.74Q153.95-15.33 155.53-11.92Q157.71-7.24 162-7.24Q165.94-7.24 168.12-11.29Q170.05-14.84 170.05-20.67Q170.05-26.75 168.05-30.23Q165.90-34.21 161.93-34.21Z';
const D_HELLO_10_20_30_TOP = 'M12.20 23.87L14.42 23.87L14.42 32.23Q16.61 30.05 18.76 30.05Q21.21 30.05 22.33 32.20Q22.96 33.42 22.96 35.15L22.96 44.87L20.74 44.87L20.74 35.81Q20.74 32.17 18.41 32.17Q16.84 32.17 15.65 33.32Q14.42 34.55 14.42 36.13L14.42 44.87L12.20 44.87L12.20 23.87ZM38.20 40.45Q36.89 45.46 32.53 45.46Q29.82 45.46 28.24 43.20Q26.80 41.14 26.80 37.75Q26.80 34.52 28.15 32.45Q29.73 30.05 32.50 30.05Q37.91 30.05 38.26 38.21L29.06 38.21Q29.23 43.45 32.56 43.45Q35.20 43.45 35.85 40.45L38.20 40.45M35.85 36.29Q35.37 32.06 32.50 32.06Q29.73 32.06 29.15 36.29L35.85 36.29ZM48.67 41.59Q48.67 42.88 49.90 42.88Q50.91 42.88 52.11 42.65L52.11 44.89Q50.34 45.14 49.51 45.14Q46.33 45.14 46.33 42.02L46.33 23.87L48.67 23.87L48.67 41.59ZM63.67 41.59Q63.67 42.88 64.90 42.88Q65.91 42.88 67.11 42.65L67.11 44.89Q65.34 45.14 64.51 45.14Q61.33 45.14 61.33 42.02L61.33 23.87L63.67 23.87L63.67 41.59ZM77.53 30.05Q80.28 30.05 81.85 32.48Q83.20 34.50 83.20 37.75Q83.20 40.20 82.39 42.05Q80.90 45.47 77.47 45.47Q74.82 45.47 73.24 43.22Q71.80 41.15 71.80 37.75Q71.80 34.09 73.46 32.00Q75.04 30.05 77.53 30.05M77.47 32.14Q75.86 32.14 74.95 33.83Q74.15 35.31 74.15 37.75Q74.15 40.01 74.80 41.43Q75.71 43.38 77.50 43.38Q79.14 43.38 80.05 41.69Q80.85 40.21 80.85 37.78Q80.85 35.25 80.02 33.80Q79.13 32.14 77.47 32.14Z';

describe('TextToSVG', () => {
  describe('getD', () => {
    it('without option args', () => {
      let expected = D_HELLO_0_0_72_KERNING;
      let actual = textToSVG.getD('hello');
      console.log(actual);
      assert.strictEqual(actual, expected);
    });

    it('with redundant default args', () => {
      let expected = D_HELLO_0_0_72_KERNING;
      let actual = textToSVG.getD('hello', {x: 0, y: 0, fontSize: 72, kerning: true, anchor: "bottom"});
      assert.strictEqual(actual, expected);
    });

    it('with args', () => {
      let expected = D_HELLO_10_20_30_TOP;
      let actual = textToSVG.getD('hello', {x: 10, y: 20, fontSize: 30, kerning: false, anchor: "top"});
      console.log(actual);
      assert.strictEqual(actual, expected);
    });

    it('with default font', () => {
      let textToSVG = new TextToSVG();
      let expected = D_HELLO_0_0_72_KERNING;
      let actual = textToSVG.getD('hello');
      assert.strictEqual(actual, expected);
    });

    it('with invalid anchor', () => {
      assert.throws(() => textToSVG.getD('hello', {anchor: "foo"}), Error, "Unknown anchor option: foo");
    });
  });

  describe('getPath', () => {
    it('without option args', ()=> {
      let expected = `<path d="${D_HELLO_0_0_72_KERNING}"/>`;
      let actual = textToSVG.getPath('hello');
      assert.strictEqual(actual, expected);
    });

    it('with redundant default args', () => {
      let expected = `<path d="${D_HELLO_0_0_72_KERNING}"/>`;
      let actual = textToSVG.getPath('hello', {x: 0, y: 0, fontSize: 72, kerning: true, anchor: "bottom"});
      assert.strictEqual(actual, expected);
    });

    it('with args', () => {
      let expected = `<path d="${D_HELLO_10_20_30_TOP}"/>`;
      let actual = textToSVG.getPath('hello', {x: 10, y: 20, fontSize: 30, kerning: false, anchor: "top"});
      assert.strictEqual(actual, expected);
    });

    it('with attribtues', () => {
      let attributes = {fill: 'red', stroke: 'black'};
      let expected = `<path fill="red" stroke="black" d="${D_HELLO_0_0_72_KERNING}"/>`;
      let actual = textToSVG.getPath('hello', {attributes});
      assert.strictEqual(actual, expected);
    });

    it('with invalid anchor', () => {
      assert.throws(() => textToSVG.getPath('hello', {anchor: "foo"}), Error, "Unknown anchor option: foo");
    });
  });

  describe('getSVG', () => {
    it('without option args', ()=> {
      let expected = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="${D_HELLO_0_0_72_KERNING}"/></svg>`;
      let actual = textToSVG.getSVG('hello');
      assert.strictEqual(actual, expected);
    });

    it('with redundant default args', () => {
      let expected = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="${D_HELLO_0_0_72_KERNING}"/></svg>`;
      let actual = textToSVG.getSVG('hello', {x: 0, y: 0, fontSize: 72, kerning: true, anchor: "bottom"});
      assert.strictEqual(actual, expected);
    });

    it('with args', () => {
      let expected = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="${D_HELLO_10_20_30_TOP}"/></svg>`;
      let actual = textToSVG.getSVG('hello', {x: 10, y: 20, fontSize: 30, kerning: false, anchor: "top"});
      assert.strictEqual(actual, expected);
    });

    it('with attribtues', () => {
      let attributes = {fill: 'red', stroke: 'black'};
      let expected = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path fill="red" stroke="black" d="${D_HELLO_0_0_72_KERNING}"/></svg>`;
      let actual = textToSVG.getSVG('hello', {attributes});
      assert.strictEqual(actual, expected);
    });

    it('with invalid anchor', () => {
      assert.throws(() => textToSVG.getSVG('hello', {anchor: "foo"}), Error, "Unknown anchor option: foo");
    });
  });
});
