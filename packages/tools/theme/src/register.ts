import { Theme } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('pap-theme-tool')) {
  cElements.define('pap-theme-tool', Theme);
}
