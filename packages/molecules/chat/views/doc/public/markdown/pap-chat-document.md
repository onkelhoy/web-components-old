# Chat

Atomic Type: molecules

Version: 1.0.0

## Development

Development servers can be started and should all exist inside `"views"` folder

## Scripts

PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and register code provided to you - could you create a rather simple introduction text with maybe a code example how to use in html - keep it very simple. Do not give example how to run the register code it's already included (this is for you so you can see the element-tag)! The introduction should be read by developers so it needs not to be simple enough for beginners!

## SOURCE-CODE

// system
import { html, property } from "@pap-it/system-utils";
import "@pap-it/tools-translator/wc";

// atoms
import "@pap-it/button/wc";
import "@pap-it/icon/wc";
import "@pap-it/input/wc";

// templates
import { BaseSystem } from "@pap-it/system-base";

// local
import { style } from "./style";

export class Chat extends BaseSystem {
  static style = style;

  // event handlers
  private handlesmileyclick = () => {
    console.log('open smileys')
  }
  private handlesendclick = () => {
    console.log('send')
  }

  render() {
    return html`
            <main></main>

            <pap-input size="medium">
                <div class="button-group" slot="suffix">
                    <pap-button radius="none" @click="${this.handlesmileyclick}" variant="clear">
                        <pap-icon customSize="20" name="smileys_emotion">smiley</pap-icon>
                    </pap-button>
                    <pap-button variant="clear" @click="${this.handlesendclick}" radius="none">
                        <pap-icon customSize="23" name="send">send</pap-icon>
                    </pap-button>
                </div>
            </pap-input>
        `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pap-chat": Chat;
  }
}

## REGISTER-CODE

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
PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and the types can you give me the following tables.

1. properties (columns: name, default-value, type, description)
2. events (columns: name - ex: 'click', type - ex: CustomEvent<ClickEvent>, description - when its being triggered etc)
3.public functions (columns: name, arguments - ex: arg1:CustomType, arg2?: boolean = true, arg3?: string, description - breif explenation what it does)

## SOURCE-CODE

 // system
import { html, property } from "@pap-it/system-utils";
import "@pap-it/tools-translator/wc";

// atoms
import "@pap-it/button/wc";
import "@pap-it/icon/wc";
import "@pap-it/input/wc";

// templates
import { BaseSystem } from "@pap-it/system-base";

// local
import { style } from "./style";

export class Chat extends BaseSystem {
  static style = style;

  // event handlers
  private handlesmileyclick = () => {
    console.log('open smileys')
  }
  private handlesendclick = () => {
    console.log('send')
  }

  render() {
    return html`
            <main></main>

            <pap-input size="medium">
                <div class="button-group" slot="suffix">
                    <pap-button radius="none" @click="${this.handlesmileyclick}" variant="clear">
                        <pap-icon customSize="20" name="smileys_emotion">smiley</pap-icon>
                    </pap-button>
                    <pap-button variant="clear" @click="${this.handlesendclick}" radius="none">
                        <pap-icon customSize="23" name="send">send</pap-icon>
                    </pap-button>
                </div>
            </pap-input>
        `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pap-chat": Chat;
  }
}

## TYPE-CODE: export {}PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is

 Based on the source code and style code probided. Can you create a documentation that includes titles, short descrition and the table for each tables: css-variables, parts, slots.
css-variables should be a table with columns: (name, default-value, type - ex. CSS unit, description).
parts should include all elements that have been exposed with the part attribute ex: <p part='foo'> - and the table should then include columns: (name, description (short)).
slots should include columns: (name, default-value, description)

## SOURCE-CODE

// system
import { html, property } from "@pap-it/system-utils";
import "@pap-it/tools-translator/wc";

// atoms
import "@pap-it/button/wc";
import "@pap-it/icon/wc";
import "@pap-it/input/wc";

// templates
import { BaseSystem } from "@pap-it/system-base";

// local
import { style } from "./style";

export class Chat extends BaseSystem {
  static style = style;

  // event handlers
  private handlesmileyclick = () => {
    console.log('open smileys')
  }
  private handlesendclick = () => {
    console.log('send')
  }

  render() {
    return html`
            <main></main>

            <pap-input size="medium">
                <div class="button-group" slot="suffix">
                    <pap-button radius="none" @click="${this.handlesmileyclick}" variant="clear">
                        <pap-icon customSize="20" name="smileys_emotion">smiley</pap-icon>
                    </pap-button>
                    <pap-button variant="clear" @click="${this.handlesendclick}" radius="none">
                        <pap-icon customSize="23" name="send">send</pap-icon>
                    </pap-button>
                </div>
            </pap-input>
        `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pap-chat": Chat;
  }
}

## STYLE-CODE

:host {
    --button-background-color-clear-hover: var(--smiley-hover-background, rgba(0, 0, 0, 0.05));

    .button-group {
        display: flex;

        pap-button {
            padding: 0.4rem;
            gap: 0;
        }
    }
}
