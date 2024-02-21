import { Item } from './components/menu-item';
import { Menu } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('pap-menu')) {
  cElements.define('pap-menu', Menu);
}
if (!cElements.get('pap-menu-item')) {
  cElements.define('pap-menu-item', Item);
}
