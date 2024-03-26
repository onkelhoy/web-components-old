import { Column } from './components/table-column';
import { Cell } from './components/table-cell';
import { TableSheets } from './components/table-sheets';
import { TableManage } from './components/table-manage';
import { TableFilterIndividual } from './components/table-filter-individual';
import { TableFilter } from './components/table-filter';
import { TableFormMenu } from './components/table-form-menu';
import { TableActionMenu } from './components/table-action-menu';
import { TableHeader } from './components/table-header';
import { TableMenu } from './components/table-menu';
import { Table } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('pap-table')) {
  cElements.define('pap-table', Table);
}
if (!cElements.get('pap-table-menu')) {
  cElements.define('pap-table-menu', TableMenu);
}
if (!cElements.get('pap-table-header')) {
  cElements.define('pap-table-header', TableHeader);
}
if (!cElements.get('pap-table-action-menu')) {
  cElements.define('pap-table-action-menu', TableActionMenu);
}
if (!cElements.get('pap-table-form-menu')) {
  cElements.define('pap-table-form-menu', TableFormMenu);
}
if (!cElements.get('pap-table-filter')) {
  cElements.define('pap-table-filter', TableFilter);
}
if (!cElements.get('pap-table-filter-individual')) {
  cElements.define('pap-table-filter-individual', TableFilterIndividual);
}
if (!cElements.get('pap-table-manage')) {
  cElements.define('pap-table-manage', TableManage);
}
if (!cElements.get('pap-table-sheets')) {
  cElements.define('pap-table-sheets', TableSheets);
}
if (!cElements.get('pap-table-cell')) {
  cElements.define('pap-table-cell', Cell);
}
if (!cElements.get('pap-table-column')) {
  cElements.define('pap-table-column', Column);
}
