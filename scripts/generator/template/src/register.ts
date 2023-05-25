import { TEMPLATE_CLASSNAME } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('TEMPLATE_PREFIXNAME')) {
  cElements.define('TEMPLATE_PREFIXNAME', TEMPLATE_CLASSNAME);
}
