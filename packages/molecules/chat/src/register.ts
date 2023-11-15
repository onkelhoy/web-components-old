import { Chat } from './component.js';
import { Writer } from './components/writer/index.js';
import { Message } from './components/message/index.js';
import { Smileys } from './components/smileys/index.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('pap-chat-smileys')) {
  cElements.define('pap-chat-smileys', Smileys);
}
if (!cElements.get('pap-chat-message')) {
  cElements.define('pap-chat-message', Message);
}
if (!cElements.get('pap-chat-writer')) {
  cElements.define('pap-chat-writer', Writer);
}
if (!cElements.get('pap-chat')) {
  cElements.define('pap-chat', Chat);
}
