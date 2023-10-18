# TextinputTemplate

Atomic Type: templates

Version: 1.0.0

## Development

Development servers can be started and should all exist inside `"views"` folder

## Scripts
PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and register code provided to you - could you create a rather simple introduction text with maybe a code example how to use in html - keep it very simple. Do not give example how to run the register code it's already included (this is for you so you can see the element-tag)! The introduction should be read by developers so it needs not to be simple enough for beginners!

## SOURCE-CODE:
// utils 
import { property } from "@pap-it/system-utils";

// templates
import { FieldTemplate } from '@pap-it/templates-field';

// local
import { style } from "./style";

export class TextinputTemplate<T extends HTMLElement = HTMLInputElement> extends FieldTemplate<T> {
  static styles = [FieldTemplate.styles[0], style];

  @property() placeholder?: string;

  private lastselection_position = 0;

  public set selectionStart(value: number) {
    if (this.inputElement instanceof HTMLInputElement || this.inputElement instanceof HTMLTextAreaElement) {
      this.inputElement.selectionStart = value;
    }
  }
  public set selectionEnd(value: number) {
    if (this.inputElement instanceof HTMLInputElement || this.inputElement instanceof HTMLTextAreaElement) {
      this.inputElement.selectionEnd = value;
    }
  }

  protected handlekeyup = () => {
    const ss = (this.inputElement as any).selectionStart;
    if (typeof ss === "number") {
      this.lastselection_position = ss;
    }
    else this.lastselection_position = (this.inputElement as any).value.length;
  }

  // public functions
  public insert(text: string) {
    let newvalue = '';
    if (this.lastselection_position < (this.inputElement as any).value.length) {
      const v = (this.inputElement as any).value;
      newvalue = [v.slice(0, this.lastselection_position), text, v.slice(this.lastselection_position, v.length)].join('');
    }
    else {
      newvalue = (this.inputElement as any).value + text;
    }

    this.value = newvalue;
    (this.inputElement as any).value = newvalue;
    this.lastselection_position += text.length;
  }
}


declare global {
  interface HTMLElementTagNameMap {
    "pap-textinput-template": TextinputTemplate;
  }
}

## REGISTER-CODE:
import { TextinputTemplate } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('pap-textinput-template')) {
  cElements.define('pap-textinput-template', TextinputTemplate);
}
PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and the types can you give me the following tables. 
1. properties (columns: name, default-value, type, description) 
2. events (columns: name - ex: 'click', type - ex: CustomEvent<ClickEvent>, description - when its being triggered etc) 
3.public functions (columns: name, arguments - ex: arg1:CustomType, arg2?: boolean = true, arg3?: string, description - breif explenation what it does)

## SOURCE-CODE:
 // utils 
import { property } from "@pap-it/system-utils";

// templates
import { FieldTemplate } from '@pap-it/templates-field';

// local
import { style } from "./style";

export class TextinputTemplate<T extends HTMLElement = HTMLInputElement> extends FieldTemplate<T> {
  static styles = [FieldTemplate.styles[0], style];

  @property() placeholder?: string;

  private lastselection_position = 0;

  public set selectionStart(value: number) {
    if (this.inputElement instanceof HTMLInputElement || this.inputElement instanceof HTMLTextAreaElement) {
      this.inputElement.selectionStart = value;
    }
  }
  public set selectionEnd(value: number) {
    if (this.inputElement instanceof HTMLInputElement || this.inputElement instanceof HTMLTextAreaElement) {
      this.inputElement.selectionEnd = value;
    }
  }

  protected handlekeyup = () => {
    const ss = (this.inputElement as any).selectionStart;
    if (typeof ss === "number") {
      this.lastselection_position = ss;
    }
    else this.lastselection_position = (this.inputElement as any).value.length;
  }

  // public functions
  public insert(text: string) {
    let newvalue = '';
    if (this.lastselection_position < (this.inputElement as any).value.length) {
      const v = (this.inputElement as any).value;
      newvalue = [v.slice(0, this.lastselection_position), text, v.slice(this.lastselection_position, v.length)].join('');
    }
    else {
      newvalue = (this.inputElement as any).value + text;
    }

    this.value = newvalue;
    (this.inputElement as any).value = newvalue;
    this.lastselection_position += text.length;
  }
}


declare global {
  interface HTMLElementTagNameMap {
    "pap-textinput-template": TextinputTemplate;
  }
}


## TYPE-CODE: export {}PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and style code probided. Can you create a documentation that includes titles, short descrition and the table for each tables: css-variables, parts, slots.
css-variables should be a table with columns: (name, default-value, type - ex. CSS unit, description).
parts should include all elements that have been exposed with the part attribute ex: <p part='foo'> - and the table should then include columns: (name, description (short)).
slots should include columns: (name, default-value, description)

## SOURCE-CODE:
// utils 
import { property } from "@pap-it/system-utils";

// templates
import { FieldTemplate } from '@pap-it/templates-field';

// local
import { style } from "./style";

export class TextinputTemplate<T extends HTMLElement = HTMLInputElement> extends FieldTemplate<T> {
  static styles = [FieldTemplate.styles[0], style];

  @property() placeholder?: string;

  private lastselection_position = 0;

  public set selectionStart(value: number) {
    if (this.inputElement instanceof HTMLInputElement || this.inputElement instanceof HTMLTextAreaElement) {
      this.inputElement.selectionStart = value;
    }
  }
  public set selectionEnd(value: number) {
    if (this.inputElement instanceof HTMLInputElement || this.inputElement instanceof HTMLTextAreaElement) {
      this.inputElement.selectionEnd = value;
    }
  }

  protected handlekeyup = () => {
    const ss = (this.inputElement as any).selectionStart;
    if (typeof ss === "number") {
      this.lastselection_position = ss;
    }
    else this.lastselection_position = (this.inputElement as any).value.length;
  }

  // public functions
  public insert(text: string) {
    let newvalue = '';
    if (this.lastselection_position < (this.inputElement as any).value.length) {
      const v = (this.inputElement as any).value;
      newvalue = [v.slice(0, this.lastselection_position), text, v.slice(this.lastselection_position, v.length)].join('');
    }
    else {
      newvalue = (this.inputElement as any).value + text;
    }

    this.value = newvalue;
    (this.inputElement as any).value = newvalue;
    this.lastselection_position += text.length;
  }
}


declare global {
  interface HTMLElementTagNameMap {
    "pap-textinput-template": TextinputTemplate;
  }
}

## STYLE-CODE:
:host {
  --background: var(--pap-textinput-background-light, var(--pap-color-neutral-50));

  pap-box-template.wrapper {
    background-color: var(--background);
  }
}

@media (prefers-color-scheme: dark) {
  :host {
    --background: var(--pap-textinput-background-dark, var(--pap-color-neutral-50));
  }
}