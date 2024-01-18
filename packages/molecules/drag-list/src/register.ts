import { Item } from './components/item';
import { DragList } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('pap-drag-list')) {
  cElements.define('pap-drag-list', DragList);
}
if (!cElements.get('pap-drag-list-item')) {
  cElements.define('pap-drag-list-item', Item);
}
