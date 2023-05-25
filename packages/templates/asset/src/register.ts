import { AssetTemplate } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('o-asset-template')) {
  cElements.define('o-asset-template', AssetTemplate);
}
