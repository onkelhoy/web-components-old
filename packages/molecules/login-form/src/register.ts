import { Email } from './components/email';
import { Password } from './components/password';
import { LoginForm } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('o-login-form')) {
  cElements.define('o-login-form', LoginForm);
}
if (!cElements.get('o-password')) {
  cElements.define('o-password', Password);
}
if (!cElements.get('o-email')) {
  cElements.define('o-email', Email);
}
