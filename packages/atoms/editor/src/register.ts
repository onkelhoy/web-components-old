import { Editor } from './component.js';
// import { Input } from './components/input/index.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

// if (!cElements.get('pap-editor-input')) {
//   cElements.define('pap-editor-input', Input);
// }

if (!cElements.get('pap-editor')) {
  cElements.define('pap-editor', Editor);
}