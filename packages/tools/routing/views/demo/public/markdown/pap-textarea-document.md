# Textarea

Atomic Type: atoms

Version: 1.0.0

## Development

Development servers can be started and should all exist inside `"views"` folder

## Scripts
PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and register code provided to you - could you create a rather simple introduction text with maybe a code example how to use in html - keep it very simple. Do not give example how to run the register code it's already included (this is for you so you can see the element-tag)! The introduction should be read by developers so it needs not to be simple enough for beginners!

## SOURCE-CODE:
// utils 
import { html, property } from "@pap-it/system-utils";

// templates
import { TextinputTemplate } from '@pap-it/templates-textinput';

// local 
import { style } from "./style";
import { Resize } from './types';

export class Textarea extends TextinputTemplate<HTMLTextAreaElement> {
  static style = style;

  @property({ type: Number }) rows: number = 4;
  @property({ rerender: false }) resize: Resize = "auto";

  // event functions
  private handleinput = (e: Event) => {
    if (this.resize === "auto" && e.target instanceof HTMLTextAreaElement) {
      // dont know why fully this works but it does 
      e.target.style.height = "auto";
      if (e.target.scrollHeight) // because it was 0 on intial case 
      {
        // the -4 is also weird but it works - maybe border ? im not sure 
        e.target.style.height = `calc(${e.target.scrollHeight}px - 4px)`;
      }
      else {
        e.target.style.height = 'auto'; // so we make sure we are auto initially
      }
    }
  }

  render() {
    return super.render(html`
            <textarea 
                @click="${this.handlekeyup}" 
                @keyup="${this.handlekeyup}" 
                @input="${this.handleinput}" 
                placeholder="${this.placeholder || ""}" 
                value="${this.value || ""}"
                rows="${this.rows}"
            ></textarea>
        `, 'textarea')
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pap-textarea": Textarea;
  }
}
## REGISTER-CODE:
import { Textarea } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('pap-textarea')) {
  cElements.define('pap-textarea', Textarea);
}
PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and the types can you give me the following tables. 
1. properties (columns: name, default-value, type, description) 
2. events (columns: name - ex: 'click', type - ex: CustomEvent<ClickEvent>, description - when its being triggered etc) 
3.public functions (columns: name, arguments - ex: arg1:CustomType, arg2?: boolean = true, arg3?: string, description - breif explenation what it does)

## SOURCE-CODE:
 // utils 
import { html, property } from "@pap-it/system-utils";

// templates
import { TextinputTemplate } from '@pap-it/templates-textinput';

// local 
import { style } from "./style";
import { Resize } from './types';

export class Textarea extends TextinputTemplate<HTMLTextAreaElement> {
  static style = style;

  @property({ type: Number }) rows: number = 4;
  @property({ rerender: false }) resize: Resize = "auto";

  // event functions
  private handleinput = (e: Event) => {
    if (this.resize === "auto" && e.target instanceof HTMLTextAreaElement) {
      // dont know why fully this works but it does 
      e.target.style.height = "auto";
      if (e.target.scrollHeight) // because it was 0 on intial case 
      {
        // the -4 is also weird but it works - maybe border ? im not sure 
        e.target.style.height = `calc(${e.target.scrollHeight}px - 4px)`;
      }
      else {
        e.target.style.height = 'auto'; // so we make sure we are auto initially
      }
    }
  }

  render() {
    return super.render(html`
            <textarea 
                @click="${this.handlekeyup}" 
                @keyup="${this.handlekeyup}" 
                @input="${this.handleinput}" 
                placeholder="${this.placeholder || ""}" 
                value="${this.value || ""}"
                rows="${this.rows}"
            ></textarea>
        `, 'textarea')
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pap-textarea": Textarea;
  }
}

## TYPE-CODE: export type Resize = "none" | "verical" | "auto"PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and style code probided. Can you create a documentation that includes titles, short descrition and the table for each tables: css-variables, parts, slots.
css-variables should be a table with columns: (name, default-value, type - ex. CSS unit, description).
parts should include all elements that have been exposed with the part attribute ex: <p part='foo'> - and the table should then include columns: (name, description (short)).
slots should include columns: (name, default-value, description)

## SOURCE-CODE:
// utils 
import { html, property } from "@pap-it/system-utils";

// templates
import { TextinputTemplate } from '@pap-it/templates-textinput';

// local 
import { style } from "./style";
import { Resize } from './types';

export class Textarea extends TextinputTemplate<HTMLTextAreaElement> {
  static style = style;

  @property({ type: Number }) rows: number = 4;
  @property({ rerender: false }) resize: Resize = "auto";

  // event functions
  private handleinput = (e: Event) => {
    if (this.resize === "auto" && e.target instanceof HTMLTextAreaElement) {
      // dont know why fully this works but it does 
      e.target.style.height = "auto";
      if (e.target.scrollHeight) // because it was 0 on intial case 
      {
        // the -4 is also weird but it works - maybe border ? im not sure 
        e.target.style.height = `calc(${e.target.scrollHeight}px - 4px)`;
      }
      else {
        e.target.style.height = 'auto'; // so we make sure we are auto initially
      }
    }
  }

  render() {
    return super.render(html`
            <textarea 
                @click="${this.handlekeyup}" 
                @keyup="${this.handlekeyup}" 
                @input="${this.handleinput}" 
                placeholder="${this.placeholder || ""}" 
                value="${this.value || ""}"
                rows="${this.rows}"
            ></textarea>
        `, 'textarea')
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pap-textarea": Textarea;
  }
}
## STYLE-CODE:
:host(:not([resize="none"])) {
    pap-box-template.wrapper {
        // very important 
        height: auto;
    }
}

:host(:not([resize="vertical"]))
{
    textarea {
        resize: none;
    }
}
:host([resize="vertical"])
{
    textarea {
        resize: vertical;
    }
}