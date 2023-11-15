import { Item } from './components/item';
import { Sidebar } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('pap-sidebar')) {
  cElements.define('pap-sidebar', Sidebar);
}
if (!cElements.get('pap-sidebar-item')) {
  cElements.define('pap-sidebar-item', Item);
}
