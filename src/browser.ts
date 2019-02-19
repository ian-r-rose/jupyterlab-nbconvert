import * as json from '@jupyterlab/json-extension';
import * as vega from '@jupyterlab/vega4-extension';
import * as vdom from '@jupyterlab/vdom-extension';

import {nbformat} from '@jupyterlab/coreutils';

import {RenderMimeRegistry} from '@jupyterlab/rendermime';

import {IRenderMime} from '@jupyterlab/rendermime-interfaces';

import {ReadonlyJSONObject} from '@phosphor/coreutils';

import {Widget} from '@phosphor/widgets';

const resolver: IRenderMime.IResolver = {
  resolveUrl: url => Promise.resolve(url),
  getDownloadUrl: url => Promise.resolve(url),
};

const registry = new RenderMimeRegistry({resolver});
registry.addFactory(json.rendererFactory);
registry.addFactory(vega.rendererFactory);
registry.addFactory(vdom.rendererFactory);

const vegaMetadata = {embed_options: {renderer: 'svg'}};
const VEGA_MIME = 'application/vnd.vega.v4+json';
const VEGALITE_MIME = 'application/vnd.vegalite.v2+json';

const metadata: {[x: string]: ReadonlyJSONObject} = {
  'application/json': {expanded: true},
  [VEGA_MIME]: {[VEGA_MIME]: vegaMetadata},
  [VEGALITE_MIME]: {[VEGALITE_MIME]: vegaMetadata},
};

async function convertMimeBundle(
  data: ReadonlyJSONObject,
): Promise<ReadonlyJSONObject> {
  for (let mimeType of Object.keys(data)) {
    if (registry.getFactory(mimeType)) {
      const renderer = registry.createRenderer(mimeType);
      Widget.attach(renderer, document.body);
      const model = registry.createModel({data, metadata: metadata[mimeType]});
      await renderer.renderModel(model);
      let newData = {'text/html': renderer.node.innerHTML};
      Widget.detach(renderer);
      return newData;
    }
  }
  return data;
}

async function convertNotebook(
  notebook: nbformat.INotebookContent,
): Promise<nbformat.INotebookContent> {
  for (let cell of notebook.cells) {
    if (cell.cell_type === 'code') {
      const outputs: nbformat.IOutput[] = (cell as nbformat.ICodeCell).outputs;
      for (let output of outputs) {
        if (
          output.output_type === 'execute_result' ||
          output.output_type === 'display_data' ||
          output.output_type === 'update_display_data'
        ) {
          const data: nbformat.IMimeBundle = output.data as nbformat.IMimeBundle;
          const updated = await convertMimeBundle(data);
          output.data = updated as nbformat.IMimeBundle;
        }
      }
    }
  }
  return notebook;
}
(window as any).convertNotebook = convertNotebook;
