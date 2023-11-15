import { Circle } from './components/circle';
import { Steps } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('pap-steps')) {
  cElements.define('pap-steps', Steps);
}
if (!cElements.get('pap-circle')) {
  cElements.define('pap-circle', Circle);
}
