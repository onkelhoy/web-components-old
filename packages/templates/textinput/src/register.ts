import { TextinputTemplate } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('o-textinput-template')) {
  cElements.define('o-textinput-template', TextinputTemplate);
}
