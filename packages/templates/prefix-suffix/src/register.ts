import { PrefixSuffix } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('pap-prefix-suffix-template')) {
  cElements.define('pap-prefix-suffix-template', PrefixSuffix);
}
