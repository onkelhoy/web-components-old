import { Message } from './components/message';
import { Form } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('pap-form')) {
  cElements.define('pap-form', Form);
}
if (!cElements.get('pap-message')) {
  cElements.define('pap-message', Message);
}