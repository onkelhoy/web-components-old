import { Chat, Message, Smileys, Writer } from './index.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) 
{
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('pap-chat')) 
{
  cElements.define('pap-chat', Aside);
}

if (!cElements.get('pap-chat-message')) 
{
  cElements.define('pap-chat-message', Message);
}

if (!cElements.get('pap-chat-smileys')) 
{
  cElements.define('pap-chat-smileys', Smileys);
}

if (!cElements.get('pap-chat-writer')) 
{
  cElements.define('pap-chat-writer', Writer);
}
