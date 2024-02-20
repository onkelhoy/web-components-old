import { Item } from './components/item';
import { Menu } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('pap-menu-template')) {
  cElements.define('pap-menu-template', Menu);
}
if (!cElements.get('pap-item-template')) {
  cElements.define('pap-item-template', Item);
}
