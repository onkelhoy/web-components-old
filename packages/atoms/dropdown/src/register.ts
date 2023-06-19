import { Dropdown } from './component.js';
import { Option } from './components/option';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('o-dropdown')) {
  cElements.define('o-dropdown', Dropdown);
}
if (!cElements.get('o-option')) {
  cElements.define('o-option', Option);
}
