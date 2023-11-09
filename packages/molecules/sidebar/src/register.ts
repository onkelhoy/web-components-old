import { Item } from './components/item';
import { Sidebar } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('o-sidebar')) {
  cElements.define('o-sidebar', Sidebar);
}
if (!cElements.get('o-sidebar-item')) {
  cElements.define('o-sidebar-item', Item);
}
