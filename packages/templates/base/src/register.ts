import { BaseTemplate } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('o-base-template')) {
  cElements.define('o-base-template', BaseTemplate);
}
