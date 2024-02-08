import { Route } from './components/route';
import { Routing } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('pap-routing-tool')) {
  cElements.define('pap-routing-tool', Routing);
}
if (!cElements.get('pap-route')) {
  cElements.define('pap-route', Route);
}
