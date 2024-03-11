import { ItemTemplate } from './components/item';
import { MenuTemplate } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('pap-menu-template')) {
  cElements.define('pap-menu-template', MenuTemplate);
}
if (!cElements.get('pap-item-template')) {
  cElements.define('pap-item-template', ItemTemplate);
}
