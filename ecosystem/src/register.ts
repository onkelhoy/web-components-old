import { MenuItem } from './components/MenuItem';
import { SideMenu } from './components/SideMenu';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('menu-item')) {
  cElements.define('menu-item', MenuItem);
}

if (!cElements.get('side-menu')) {
  cElements.define('side-menu', SideMenu);
}
