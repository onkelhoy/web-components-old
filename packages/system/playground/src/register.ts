import { PlaygroundSyste } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('pap-playground-syste')) {
  cElements.define('pap-playground-syste', PlaygroundSyste);
}
