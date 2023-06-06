import { Chat } from './component.js';
import { Writer } from './components/writer/index.js';
import { Message } from './components/message/index.js';
import { Smileys } from './components/smileys/index.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('o-chat-smileys')) {
  cElements.define('o-chat-smileys', Smileys);
}
if (!cElements.get('o-chat-message')) {
  cElements.define('o-chat-message', Message);
}
if (!cElements.get('o-chat-writer')) {
  cElements.define('o-chat-writer', Writer);
}
if (!cElements.get('o-chat')) {
  cElements.define('o-chat', Chat);
}
