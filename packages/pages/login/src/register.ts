import { Username } from './components/username';
import { Password } from './components/password';
import { Email } from './components/email';
import { LoginPage } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('o-login-page')) {
  cElements.define('o-login-page', LoginPage);
}
if (!cElements.get('o-email')) {
  cElements.define('o-email', Email);
}
if (!cElements.get('o-password')) {
  cElements.define('o-password', Password);
}
if (!cElements.get('o-username')) {
  cElements.define('o-username', Username);
}
