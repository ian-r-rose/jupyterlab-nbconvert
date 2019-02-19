/**
 * CLI script to transform notebook mimebundles to text/html
 * using jupyterlab renderers.
 */

const process = require('process');
require('jsdom-global')();
global.navigator = {
  platform: process.platform,
  userAgent: 'Node'
};

const json = require('@jupyterlab/json-extension');
const vega4 = require('@jupyterlab/vega4-extension');
const vdom = require('@jupyterlab/vdom-extension');
const fs = require('fs');


function convert(bundle) {
  return bundle;
}


const data = fs.readFileSync(0);
const converted = convert(data);
console.log(converted);
