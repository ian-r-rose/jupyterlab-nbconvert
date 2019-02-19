# jupyterlab-nbconvert

This is an experiment in using some JupyterLab renderers to as a preprocessor for nbconvert.

## Requirements

Node >= 8.0

## Installation

Build the project by running
```bash
npm install
npm run build
```
This may take a few minutes.

## Running the test
There is a test notebook, `test.ipynb` that contains outputs for VegaLite,
VDOM, and JSON. None of these have nice renderers built into `nbconvert`.
This repository converts those outputs to a `text/html` MIME type,
which `nbconvert` should understand.

You can convert the test notebook to HTML using
```bash
node script.js test.ipynb test-out.ipynb
jupyter nbconvert test-out.ipynb --to html
```
