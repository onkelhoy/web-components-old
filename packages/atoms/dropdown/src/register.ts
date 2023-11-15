import { Dropdown } from './component.js';
import { Option } from './components/option';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('pap-dropdown')) {
  cElements.define('pap-dropdown', Dropdown);
}
if (!cElements.get('pap-option')) {
  cElements.define('pap-option', Option);
}
