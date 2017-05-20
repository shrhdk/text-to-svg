/**
 * Copyright (c) 2016 Hideki Shiro
 */

/* eslint-disable no-console,  */

import fs from 'fs';
import TextToSVG from '../src';
const textToSVG = TextToSVG.loadSync();

const STYLE = `
  table {
    border-collapse: collapse;
  }

  tr.pass {
    background-color: #90EE90;
  }

  tr.fail {
    background-color: #FFC0CB;
  }

  th, td {
    padding: 3px;
    border: 1px solid #b9b9b9;
  }
`;

export default function(runner, mochaOptions) {
  let failures = 0;
  const stack = []; // 0:'TextToSVG' <- 1:'method' <- 2:'text' = [SP]

  const dest = mochaOptions.reporterOptions.dest;
  console.log(`write test report to ${dest}`);
  fs.writeFileSync(dest, '');

  function write(str) {
    fs.appendFileSync(dest, str);
  }

  function ontest(test, err) {
    const text = stack[2];
    const options = JSON.parse(test.title);
    const metrics = textToSVG.getMetrics(text, options);
    const d = textToSVG.getD(text, options);
    const svg = textToSVG.getDebugSVG(text, options);

    if (err) {
      failures++;
    }

    write(`<tr class="${err ? 'fail' : 'pass'}">`);
    write(`<td><pre>${JSON.stringify(options, null, 2)}</pre></td>`);
    write(`<td>${svg}</td>`);
    write(`<td><pre>${JSON.stringify(metrics, null, 2)}</pre></td>`);
    write(`<td><pre>${d}</pre></td>`);
    write('</tr>');
  }

  runner.on('start', () => {
    write('<html >');
    write('<head>');
    write('<meta charset="UTF-8" />');
    write('<title>TextToSVG</title>');
    write('</head>');
    write('<body>');
    write(`<style>${STYLE}</style>`);
  });

  runner.on('suite', suite => {
    if (suite.root) {
      return;
    }

    stack.push(suite.title);
    switch (stack.length - 1) {
      case 0: // TextToSVG
        write(`<h1>${suite.title}</h1>`);
        break;
      case 1: // method
        write(`<h2>${suite.title}</h2>`);
        break;
      case 2: // text
        write(`<h3>${suite.title}</h3>`);
        write('<table>');
        write('<tr>');
        write('<th>options</th>');
        write('<th>svg</th>');
        write('<th>getMetrics</th>');
        write('<th>getD</th>');
        write('</tr>');
        break;
      default:
        throw new Error('Unknown Depth');
    }
  });

  runner.on('suite end', suite => {
    if (stack.length === 3) {
      write('</table>');
    }
    stack.pop(suite.title);
  });

  runner.on('pass', (test) => {
    ontest(test, null);
  });

  runner.on('fail', (test, err) => {
    ontest(test, err);
  });

  runner.on('end', () => {
    write('</body></html>');
    process.exit(failures);
  });
}

module.exports = exports.default;
