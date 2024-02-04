import { ThemeMenu } from './components/theme-menu';
import { Lightdark } from './components/lightdark';
import { Theme } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('pap-theme')) {
  cElements.define('pap-theme', Theme);
}
if (!cElements.get('pap-lightdark')) {
  cElements.define('pap-lightdark', Lightdark);
}
if (!cElements.get('pap-theme-menu')) {
  cElements.define('pap-theme-menu', ThemeMenu);
}
