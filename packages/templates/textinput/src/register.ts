import { TextinputTemplate } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('pap-textinput-template')) {
  cElements.define('pap-textinput-template', TextinputTemplate);
}
