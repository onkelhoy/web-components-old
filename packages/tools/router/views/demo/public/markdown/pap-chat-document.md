# Chat

Atomic Type: molecules

Version: 1.0.0

## Development

Development takes place within the `src` folder. To add a new subcomponent, use the command `npm run component:add`. This command updates the `.env` file, creates a view folder, and adds a subfolder in the `components` folder (creating it if it doesn't exist) inside `src` with all the necessary files.

Styling is managed in the `style.scss` file, which automatically generates a `style.ts` file for use in the component.

## Viewing

To view the component, run `npm start`. This command is equivalent to `npm run start demo` and launches the development server for the demo folder located within the `views` folder. This allows you to preview your component during development.

## Assets

All assets required by the component, such as icons and images for translations, should be placed in the `assets` folder. This folder will already include an `icons` and `translations` folder with an `en.json` file for English translations. Use this structure to organize translations and make them easily accessible for other projects.

For assets used solely for display or demo purposes, create a `public` folder under the relevant directory inside the `views` folder. These assets are not included in the component package.

## Commands

- **build**: Builds the component in development mode. Use the `--prod` flag (`npm run build -- --prod`) for a production build, which includes minification.
- **watch**: Watches for changes to the component files and rebuilds them automatically without starting the development server.
- **start**: Starts the development server for a specific demo. The target folder within the `views` directory must contain an `index.html` file. Usage example: `npm run start --name=<folder>`.
- **analyse**: Generates a comprehensive analysis file, mainly useful for React scripts and potentially for generating pages. The analysis file is only generated if it does not exist, unless the `--force` flag is used. Optional flags include `--verbose` and `--force`.
- **react**: Generates the necessary React code based on the web component code, including any subcomponents. The generated code will not overwrite existing files, allowing for manual customization. Flags: `--verbose` & `--force`.

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
import { Base } from "@pap-it/system-base";

// local
import { style } from "./style";

export class Chat extends Base {
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
                        <pap-icon custom-size="20" name="smileys_emotion">smiley</pap-icon>
                    </pap-button>
                    <pap-button variant="clear" @click="${this.handlesendclick}" radius="none">
                        <pap-icon custom-size="23" name="send">send</pap-icon>
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
import { Base } from "@pap-it/system-base";

// local
import { style } from "./style";

export class Chat extends Base {
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
                        <pap-icon custom-size="20" name="smileys_emotion">smiley</pap-icon>
                    </pap-button>
                    <pap-button variant="clear" @click="${this.handlesendclick}" radius="none">
                        <pap-icon custom-size="23" name="send">send</pap-icon>
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
import { Base } from "@pap-it/system-base";

// local
import { style } from "./style";

export class Chat extends Base {
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
                        <pap-icon custom-size="20" name="smileys_emotion">smiley</pap-icon>
                    </pap-button>
                    <pap-button variant="clear" @click="${this.handlesendclick}" radius="none">
                        <pap-icon custom-size="23" name="send">send</pap-icon>
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
