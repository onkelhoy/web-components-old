import { Editor } from './component.js';
import { Input } from './components/input/index.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('o-editor-input')) {
  cElements.define('o-editor-input', Input);
}

if (!cElements.get('o-editor')) {
  cElements.define('o-editor', Editor);
}
