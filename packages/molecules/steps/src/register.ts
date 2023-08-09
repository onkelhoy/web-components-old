import { Circle } from './components/circle';
import { Steps } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('o-steps')) {
  cElements.define('o-steps', Steps);
}
if (!cElements.get('o-circle')) {
  cElements.define('o-circle', Circle);
}
