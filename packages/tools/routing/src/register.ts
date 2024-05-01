import { Route } from './components/route';
import { Routing } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('pap-routing')) {
  cElements.define('pap-routing', Routing);
}
if (!cElements.get('pap-route')) {
  cElements.define('pap-route', Route);
}
