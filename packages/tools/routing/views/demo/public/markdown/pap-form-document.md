# Form

Atomic Type: atoms

Version: 1.0.0

## Development

Development servers can be started and should all exist inside `"views"` folder

## Scripts
PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and register code provided to you - could you create a rather simple introduction text with maybe a code example how to use in html - keep it very simple. Do not give example how to run the register code it's already included (this is for you so you can see the element-tag)! The introduction should be read by developers so it needs not to be simple enough for beginners!

## SOURCE-CODE:
// utils 
import { html, property, query } from "@pap-it/system-utils";

// templates
import { BaseSystem } from "@pap-it/system-base";

// local 
import { style } from "./style";
import { OSubmitEvent } from './types'
import { Message, Variant as MessageType } from "./components/message";

export class Form extends BaseSystem {
  static style = style;

  @property({ rerender: false, onUpdate: "onerrorupdate" }) error?: string;
  @property({ rerender: false, onUpdate: "onwarningupdate" }) warning?: string;
  @property({ rerender: false, onUpdate: "onsuccessupdate" }) success?: string;

  @query('pap-message') messageElement!: Message;
  @query('form') formElement!: HTMLFormElement;

  // update handlers
  private onerrorupdate = () => {
    if (!this.messageElement) return 10;
    if (this.error) this.showMessage(this.error, "error");
  }
  private onwarningupdate = () => {
    if (!this.messageElement) return 10;
    if (this.warning) this.showMessage(this.warning, "warning");
  }
  private onsuccessupdate = () => {
    if (!this.messageElement) return 10;
    if (this.success) this.showMessage(this.success, "success");
  }

  // event handlers
  private handlesubmit = (e: Event) => {
    e.preventDefault();
    // e.stopPropagation();

    if (e.target instanceof HTMLFormElement) {
      let data: any = new FormData(e.target);
      if (data) data = Array.from(data as any);

      this.dispatchEvent(new SubmitEvent("submit"));
      this.dispatchEvent(new CustomEvent<OSubmitEvent>("pap-submit", {
        detail: {
          data,
          element: e.target
        }
      }));
    }

    return false;
  }

  // public functions 
  public showMessage(message: string, type: MessageType) {
    this.messageElement.innerHTML = message;
    this.messageElement.variant = type;
    this.messageElement.open = true;
  }
  public hideMessage() {
    this.messageElement.open = false;
  }
  public checkValidity() {
    if (this.formElement) return this.formElement.checkValidity();
    return false;
  }
  public reportValidity() {
    if (this.formElement) return this.formElement.reportValidity();
    return false;
  }

  render() {
    return html`
            <form part="form" @submit="${this.handlesubmit}">
                <div part="message-wrapper">
                    <pap-message part="message"></pap-message>
                </div>
                <slot></slot>
            </form>
        `
  }
}
## REGISTER-CODE:
import { Message } from './components/message';
import { Form } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('pap-form')) {
  cElements.define('pap-form', Form);
}
if (!cElements.get('pap-message')) {
  cElements.define('pap-message', Message);
}
PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and the types can you give me the following tables. 
1. properties (columns: name, default-value, type, description) 
2. events (columns: name - ex: 'click', type - ex: CustomEvent<ClickEvent>, description - when its being triggered etc) 
3.public functions (columns: name, arguments - ex: arg1:CustomType, arg2?: boolean = true, arg3?: string, description - breif explenation what it does)

## SOURCE-CODE:
 // utils 
import { html, property, query } from "@pap-it/system-utils";

// templates
import { BaseSystem } from "@pap-it/system-base";

// local 
import { style } from "./style";
import { OSubmitEvent } from './types'
import { Message, Variant as MessageType } from "./components/message";

export class Form extends BaseSystem {
  static style = style;

  @property({ rerender: false, onUpdate: "onerrorupdate" }) error?: string;
  @property({ rerender: false, onUpdate: "onwarningupdate" }) warning?: string;
  @property({ rerender: false, onUpdate: "onsuccessupdate" }) success?: string;

  @query('pap-message') messageElement!: Message;
  @query('form') formElement!: HTMLFormElement;

  // update handlers
  private onerrorupdate = () => {
    if (!this.messageElement) return 10;
    if (this.error) this.showMessage(this.error, "error");
  }
  private onwarningupdate = () => {
    if (!this.messageElement) return 10;
    if (this.warning) this.showMessage(this.warning, "warning");
  }
  private onsuccessupdate = () => {
    if (!this.messageElement) return 10;
    if (this.success) this.showMessage(this.success, "success");
  }

  // event handlers
  private handlesubmit = (e: Event) => {
    e.preventDefault();
    // e.stopPropagation();

    if (e.target instanceof HTMLFormElement) {
      let data: any = new FormData(e.target);
      if (data) data = Array.from(data as any);

      this.dispatchEvent(new SubmitEvent("submit"));
      this.dispatchEvent(new CustomEvent<OSubmitEvent>("pap-submit", {
        detail: {
          data,
          element: e.target
        }
      }));
    }

    return false;
  }

  // public functions 
  public showMessage(message: string, type: MessageType) {
    this.messageElement.innerHTML = message;
    this.messageElement.variant = type;
    this.messageElement.open = true;
  }
  public hideMessage() {
    this.messageElement.open = false;
  }
  public checkValidity() {
    if (this.formElement) return this.formElement.checkValidity();
    return false;
  }
  public reportValidity() {
    if (this.formElement) return this.formElement.reportValidity();
    return false;
  }

  render() {
    return html`
            <form part="form" @submit="${this.handlesubmit}">
                <div part="message-wrapper">
                    <pap-message part="message"></pap-message>
                </div>
                <slot></slot>
            </form>
        `
  }
}

## TYPE-CODE: type Data = [name:string, value: string];
export type OSubmitEvent = { element: HTMLFormElement; data: Data[] };PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and style code probided. Can you create a documentation that includes titles, short descrition and the table for each tables: css-variables, parts, slots.
css-variables should be a table with columns: (name, default-value, type - ex. CSS unit, description).
parts should include all elements that have been exposed with the part attribute ex: <p part='foo'> - and the table should then include columns: (name, description (short)).
slots should include columns: (name, default-value, description)

## SOURCE-CODE:
// utils 
import { html, property, query } from "@pap-it/system-utils";

// templates
import { BaseSystem } from "@pap-it/system-base";

// local 
import { style } from "./style";
import { OSubmitEvent } from './types'
import { Message, Variant as MessageType } from "./components/message";

export class Form extends BaseSystem {
  static style = style;

  @property({ rerender: false, onUpdate: "onerrorupdate" }) error?: string;
  @property({ rerender: false, onUpdate: "onwarningupdate" }) warning?: string;
  @property({ rerender: false, onUpdate: "onsuccessupdate" }) success?: string;

  @query('pap-message') messageElement!: Message;
  @query('form') formElement!: HTMLFormElement;

  // update handlers
  private onerrorupdate = () => {
    if (!this.messageElement) return 10;
    if (this.error) this.showMessage(this.error, "error");
  }
  private onwarningupdate = () => {
    if (!this.messageElement) return 10;
    if (this.warning) this.showMessage(this.warning, "warning");
  }
  private onsuccessupdate = () => {
    if (!this.messageElement) return 10;
    if (this.success) this.showMessage(this.success, "success");
  }

  // event handlers
  private handlesubmit = (e: Event) => {
    e.preventDefault();
    // e.stopPropagation();

    if (e.target instanceof HTMLFormElement) {
      let data: any = new FormData(e.target);
      if (data) data = Array.from(data as any);

      this.dispatchEvent(new SubmitEvent("submit"));
      this.dispatchEvent(new CustomEvent<OSubmitEvent>("pap-submit", {
        detail: {
          data,
          element: e.target
        }
      }));
    }

    return false;
  }

  // public functions 
  public showMessage(message: string, type: MessageType) {
    this.messageElement.innerHTML = message;
    this.messageElement.variant = type;
    this.messageElement.open = true;
  }
  public hideMessage() {
    this.messageElement.open = false;
  }
  public checkValidity() {
    if (this.formElement) return this.formElement.checkValidity();
    return false;
  }
  public reportValidity() {
    if (this.formElement) return this.formElement.reportValidity();
    return false;
  }

  render() {
    return html`
            <form part="form" @submit="${this.handlesubmit}">
                <div part="message-wrapper">
                    <pap-message part="message"></pap-message>
                </div>
                <slot></slot>
            </form>
        `
  }
}
## STYLE-CODE:
:host {
    display: block;

    form {
        div {
            display: flex;
            justify-content: center;

            pap-message {
                flex-grow: 1;
            }
        }
    }
}

@media (prefers-color-scheme: dark) {}