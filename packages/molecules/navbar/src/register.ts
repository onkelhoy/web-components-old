import { NavbarItem } from './components/navbar-item';
import { Navbar } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('o-navbar')) {
  cElements.define('o-navbar', Navbar);
}
if (!cElements.get('o-navbar-item')) {
  cElements.define('o-navbar-item', NavbarItem);
}
