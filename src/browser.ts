import * as json from '@jupyterlab/json-extension';
import * as vega from  '@jupyterlab/vega4-extension';
import * as vdom from '@jupyterlab/vdom-extension';

import { RenderMimeRegistry } from '@jupyterlab/rendermime';

import { ReadonlyJSONObject } from '@phosphor/coreutils';

import { Widget } from '@phosphor/widgets';

const registry = new RenderMimeRegistry();
registry.addFactory(json.rendererFactory);
registry.addFactory(vega.rendererFactory);
registry.addFactory(vdom.rendererFactory);

const metadata: { [x: string]: ReadonlyJSONObject } = {
  'application/json': { expanded: true }
};


async function convert(data: ReadonlyJSONObject): Promise<ReadonlyJSONObject> {
  for (let mimeType of Object.keys(data)) {
    if(registry.getFactory(mimeType)) {
      const renderer = registry.createRenderer(mimeType);
      Widget.attach(renderer, document.body);
      const model = registry.createModel({ data, metadata: metadata[mimeType] });
      await renderer.renderModel(model);
      let newData = { 'text/html': renderer.node.innerHTML };
      Widget.detach(renderer);
      return newData;
    }
  }
  return data;
}

(window as any).convert = convert;
