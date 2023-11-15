import { Theme } from './components/theme';
import { Language } from './components/language';
import { Header } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('pap-header')) {
  cElements.define('pap-header', Header);
}
if (!cElements.get('pap-language')) {
  cElements.define('pap-language', Language);
}
if (!cElements.get('pap-theme')) {
  cElements.define('pap-theme', Theme);
}
