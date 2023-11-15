import { Menu } from './components/menu';
import { CellTitle } from './components/cell-title';
import { Cell } from './components/cell';
import { Table } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('pap-table')) {
  cElements.define('pap-table', Table);
}
if (!cElements.get('pap-cell')) {
  cElements.define('pap-cell', Cell);
}
if (!cElements.get('pap-cell-title')) {
  cElements.define('pap-cell-title', CellTitle);
}
if (!cElements.get('pap-menu')) {
  cElements.define('pap-menu', Menu);
}
