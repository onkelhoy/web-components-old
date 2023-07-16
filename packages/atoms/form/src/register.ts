import { Message } from './components/message';
import { Form } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('o-form')) {
  cElements.define('o-form', Form);
}
if (!cElements.get('o-message')) {
  cElements.define('o-message', Message);
}
