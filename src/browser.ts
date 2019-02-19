import * as json from '@jupyterlab/json-extension';
import * as vega from  '@jupyterlab/vega4-extension';
import * as vdom from '@jupyterlab/vdom-extension';

import { RenderMimeRegistry } from '@jupyterlab/rendermime';

import { ReadonlyJSONObject } from '@phosphor/coreutils';

const registry = new RenderMimeRegistry();
registry.addFactory(json.rendererFactory);
registry.addFactory(vega.rendererFactory);
registry.addFactory(vdom.rendererFactory);


function convert(data: ReadonlyJSONObject): ReadonlyJSONObject {
  return data;
}

window.convert = convert;
