import { SidebarHeaderTemplate } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('o-sidebar-header-template')) {
  cElements.define('o-sidebar-header-template', SidebarHeaderTemplate);
}
