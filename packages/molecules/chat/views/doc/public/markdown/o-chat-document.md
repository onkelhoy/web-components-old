# Chat

Atomic Type: molecules

Version: 1.0.0

## Development 
Development servers can be started and should all exist inside `"views"` folder

## Scripts 
PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and register code provided to you - could you create a rather simple introduction text with maybe a code example how to use in html - keep it very simple. Do not give example how to run the register code it's already included (this is for you so you can see the element-tag)! The introduction should be read by developers so it needs not to be simple enough for beginners!

## SOURCE-CODE:
// utils 
import { html, property } from "@circular-tools/utils";
import "@circular-tools/translator/wc";

// atoms 
import "@circular/button/wc";
import "@circular/icon/wc";
import "@circular/input/wc";

// templates
import { BaseTemplate } from "@circular-templates/base";

// local 
import { style } from "./style";

export class Chat extends BaseTemplate {
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

            
            <o-input size="medium">
                <div class="button-group" slot="suffix">
                    <o-button radius="none" @click="${this.handlesmileyclick}" variant="clear">
                        <o-icon customSize="20" name="smileys_emotion">smiley</o-icon>
                    </o-button>
                    <o-button variant="clear" @click="${this.handlesendclick}" radius="none">
                        <o-icon customSize="23" name="send">send</o-icon>
                    </o-button>
                </div>
            </o-input>
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "o-chat": Chat;
    }
}
## REGISTER-CODE:
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
PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and the types can you give me the following tables. 
1. properties (columns: name, default-value, type, description) 
2. events (columns: name - ex: 'click', type - ex: CustomEvent<ClickEvent>, description - when its being triggered etc) 
3.public functions (columns: name, arguments - ex: arg1:CustomType, arg2?: boolean = true, arg3?: string, description - breif explenation what it does)

## SOURCE-CODE:
 // utils 
import { html, property } from "@circular-tools/utils";
import "@circular-tools/translator/wc";

// atoms 
import "@circular/button/wc";
import "@circular/icon/wc";
import "@circular/input/wc";

// templates
import { BaseTemplate } from "@circular-templates/base";

// local 
import { style } from "./style";

export class Chat extends BaseTemplate {
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

            
            <o-input size="medium">
                <div class="button-group" slot="suffix">
                    <o-button radius="none" @click="${this.handlesmileyclick}" variant="clear">
                        <o-icon customSize="20" name="smileys_emotion">smiley</o-icon>
                    </o-button>
                    <o-button variant="clear" @click="${this.handlesendclick}" radius="none">
                        <o-icon customSize="23" name="send">send</o-icon>
                    </o-button>
                </div>
            </o-input>
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "o-chat": Chat;
    }
}

## TYPE-CODE: export {}PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and style code probided. Can you create a documentation that includes titles, short descrition and the table for each tables: css-variables, parts, slots.
css-variables should be a table with columns: (name, default-value, type - ex. CSS unit, description).
parts should include all elements that have been exposed with the part attribute ex: <p part='foo'> - and the table should then include columns: (name, description (short)).
slots should include columns: (name, default-value, description)

## SOURCE-CODE:
// utils 
import { html, property } from "@circular-tools/utils";
import "@circular-tools/translator/wc";

// atoms 
import "@circular/button/wc";
import "@circular/icon/wc";
import "@circular/input/wc";

// templates
import { BaseTemplate } from "@circular-templates/base";

// local 
import { style } from "./style";

export class Chat extends BaseTemplate {
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

            
            <o-input size="medium">
                <div class="button-group" slot="suffix">
                    <o-button radius="none" @click="${this.handlesmileyclick}" variant="clear">
                        <o-icon customSize="20" name="smileys_emotion">smiley</o-icon>
                    </o-button>
                    <o-button variant="clear" @click="${this.handlesendclick}" radius="none">
                        <o-icon customSize="23" name="send">send</o-icon>
                    </o-button>
                </div>
            </o-input>
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "o-chat": Chat;
    }
}
## STYLE-CODE:
:host {
    --button-background-color-clear-hover: var(--smiley-hover-backgroun, rgba(0, 0, 0, 0.05));

    .button-group {
        display: flex;

        o-button {
            padding: 0.4rem;
            gap: 0;
        }
    }
}
