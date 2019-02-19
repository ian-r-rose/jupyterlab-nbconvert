/**
 * CLI script to transform notebook mimebundles to text/html
 * using jupyterlab renderers.
 */

const puppeteer = require('puppeteer');
const fs = require('fs');

const input = process.argv[2];
const output = process.argv[3];

if (!input || !output) {
  console.log('Must specify an input and an output file');
  process.exit(1);
}
const notebook = JSON.parse(fs.readFileSync(input))

async function convert(nb) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('file://' + __dirname + '/static/index.html')
  const newNb = await page.evaluate(nb => window.convertNotebook(nb), nb);
  await browser.close();
  return newNb;
}

convert(notebook).then(newNotebook => {
  fs.writeFileSync(output, JSON.stringify(newNotebook, null, 2));
});
