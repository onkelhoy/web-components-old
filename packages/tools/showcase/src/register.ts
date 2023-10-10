import { Card } from './components/card';
import { Guideline } from './components/guideline';
import { Header } from './components/header';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('showcase-header')) {
  cElements.define('showcase-header', Header);
}
if (!cElements.get('showcase-guideline')) {
  cElements.define('showcase-guideline', Guideline);
}
if (!cElements.get('showcase-card')) {
  cElements.define('showcase-card', Card);
}
