import { Asset } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('pap-asset-template')) {
  cElements.define('pap-asset-template', Asset);
}
