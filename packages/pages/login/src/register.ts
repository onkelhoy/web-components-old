import { Username } from './components/username';
import { Password } from './components/password';
import { Email } from './components/email';
import { LoginPage } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('pap-login-page')) {
  cElements.define('pap-login-page', LoginPage);
}
if (!cElements.get('pap-email')) {
  cElements.define('pap-email', Email);
}
if (!cElements.get('pap-password')) {
  cElements.define('pap-password', Password);
}
if (!cElements.get('pap-username')) {
  cElements.define('pap-username', Username);
}
