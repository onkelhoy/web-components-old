import { Tooltip } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('pap-tooltip')) {
  cElements.define('pap-tooltip', Tooltip);
}
