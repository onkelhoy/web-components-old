import { Option } from './components/option/index.js';
import { Select } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('pap-select')) {
  cElements.define('pap-select', Select);
}
if (!cElements.get('pap-option')) {
  cElements.define('pap-option', Option);
}
