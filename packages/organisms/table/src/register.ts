import { ChecklistToolbar } from './components/checklist-toolbar';
import { Export } from './components/export';
import { Column } from './components/column';
import { Cell } from './components/cell';
import { Sheets } from './components/sheets';
import { Manage } from './components/manage';
import { FilterIndividual } from './components/filter-individual';
import { Filter } from './components/filter';
import { FormMenu } from './components/form-menu';
import { ActionMenu } from './components/action-menu';
import { Header } from './components/header';
import { Menu } from './components/menu';
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
  cElements.define('pap-table-menu', Menu);
}
if (!cElements.get('pap-table-header')) {
  cElements.define('pap-table-header', Header);
}
if (!cElements.get('pap-table-action-menu')) {
  cElements.define('pap-table-action-menu', ActionMenu);
}
if (!cElements.get('pap-table-form-menu')) {
  cElements.define('pap-table-form-menu', FormMenu);
}
if (!cElements.get('pap-table-filter')) {
  cElements.define('pap-table-filter', Filter);
}
if (!cElements.get('pap-table-filter-individual')) {
  cElements.define('pap-table-filter-individual', FilterIndividual);
}
if (!cElements.get('pap-table-manage')) {
  cElements.define('pap-table-manage', Manage);
}
if (!cElements.get('pap-table-sheets')) {
  cElements.define('pap-table-sheets', Sheets);
}
if (!cElements.get('pap-table-cell')) {
  cElements.define('pap-table-cell', Cell);
}
if (!cElements.get('pap-table-column')) {
  cElements.define('pap-table-column', Column);
}
if (!cElements.get('pap-table-export')) {
  cElements.define('pap-table-export', Export);
}
if (!cElements.get('pap-table-checklist-toolbar')) {
  cElements.define('pap-table-checklist-toolbar', ChecklistToolbar);
}
