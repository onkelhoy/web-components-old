# Field

Atomic Type: templates

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

// utils
import { html, query, property, debounce, Radius, Size } from "@pap-it/system-utils";

// atoms
import { Typography } from "@pap-it/typography";
import "@pap-it/icon/wc";
import "@pap-it/typography/wc";

// templates
import { FormElement } from "@pap-it/templates-form-element";
import "@pap-it/templates-box/wc";

// local
import { style } from "./style";
import { FieldValidityState, FieldValidityStateName, Message, ValidationAttributes } from "./types";

export class Field<T extends HTMLElement = HTMLInputElement> extends FormElement {
  static styles = [style];

  // queries
  @query('.counter') public counterElement?: HTMLSpanElement;
  @query('.error > pap-typography') errorText?: Typography;
  @query('.warning > pap-typography') warningText?: Typography;

  @property({ type: Object }) message?: Message;
  @property() label?: string;
  @property({ rerender: false }) size: Size = "medium";
  @property({ rerender: false }) radius: Radius = "small";
  @property({ rerender: false, type: Boolean, onUpdate: "oncheckedupdate" }) checked?: boolean;
  @property({ rerender: false, type: Number }) tabIndex = 1;
  @property({ type: Boolean }) readonly: boolean = false;
  @property({ rerender: false, onUpdate: "onvalueupdate" }) value: string = "";

  // error/warning
  @property({ rerender: false, type: Object }) customError?: FieldValidityState;
  @property({ rerender: false, type: Object }) customWarning?: FieldValidityState;
  @property({ rerender: false, type: Boolean }) isError = false;
  @property({ rerender: false, type: Boolean }) isWarning = false;

  // common regulations
  @property({ rerender: false, type: Number }) max?: number;
  @property({ rerender: false, type: Number }) min?: number;
  @property({ rerender: false, type: Number }) maxLength?: number;

  @property({ type: Object, attribute: false }) protected _suffix?: DocumentFragment | string = "<span> </span>";
  @property({ type: Object, attribute: false }) protected_prefix?: DocumentFragment | string = "<span> </span>";

  public inputElement!: T;
  private hiddenElement?: HTMLInputElement;
  private attributequeue: [string, string | null][] = [];

  // on update functions
  private onvalueupdate = (value: string) => {
    if (!this.inputElement) return;

    const type = this.inputElement.getAttribute('type')
    if ('checked' in this.inputElement && (type === "radio" || type === "checkbox")) {
      this.checked = value === "true";
      this.inputElement.checked = this.checked;
      if (this.hiddenElement) {
        this.hiddenElement.checked = this.checked;
        this.hiddenElement.value = this.value;
        this.updateHidden();
      }

      if (!this.checked) {
        this.inputElement.removeAttribute("checked");
        if (this.hiddenElement) {
          this.hiddenElement.removeAttribute("checked");
          this.updateHidden();
        }
      }
    }
    else if ('value' in this.inputElement) {
      this.inputElement.value = this.value;
    }

    if (type === "radio" || type === "checkbox" || this.inputElement.getAttribute('data-tagname') === "select" || this.inputElement.tagName === "select") {
      this.inputElement.dispatchEvent(new Event('change'));
    }
    else {
      this.inputElement.dispatchEvent(new Event('input'));
    }
  }
  protected oncheckedupdate = (value: boolean) => {
    this.onvalueupdate(value.toString());
  }

  // event handlers
  private handleinvalid_field = (e: Event) => {
    console.log('invalid')
  }
  private handlevalid_field = (e: Event) => {
    console.log('valid');
  }
  protected handleinput_field = (e: Event) => {
    this.handlechange_field(e, false);

    this.dispatchEvent(new Event('input'));
    this.debouncedInput();

    if (this.maxLength && this.counterElement) {
      this.counterElement.innerHTML = this.value.length.toString();
    }
  }
  protected handlechange_field = (e: Event, dispatch = true) => {
    if (e.target instanceof HTMLElement) {
      const type = e.target.getAttribute('type')
      if ('checked' in e.target && (type === "radio" || type === "checkbox")) {
        // do something ?
        this.value = (e.target.checked || false).toString();
        if (this.hiddenElement) {
          this.hiddenElement.value = this.value;
          this.updateHidden();
        }
      }
      else if ('value' in e.target) {
        this.value = e.target.value as string;
        if (this.hiddenElement) {
          this.hiddenElement.value = this.value;
          this.updateHidden();
        }
      }

      if (dispatch) {
        this.dispatchEvent(new Event('change'))
      }
    }
  }
  private handleformelementload = () => {
    this.assignHiddenElement();
  }
  private handlevalid = () => {
    this.isError = false;
    this.isWarning = false;
  }
  private handleinvalid = (e: Event) => {
    // from a submit
    if (!(this.isError && this.isWarning)) this.updateHidden();
  }

  // private functions ¨
  protected debouncedInput = () => {
    this.dispatchEvent(new Event('debounced-input'));
  }
  private assignHiddenElement() {
    if (!this.formElement) this.findForm();
    if (!this.hiddenElement && this.getAttribute("name")) {
      // form in case of initial and not dynamic (most cases) needs to load ?
      this.hiddenElement = document.createElement("input");
      this.hiddenElement.value = this.value;
      this.hiddenElement.setAttribute('name', this.getAttribute("name") as string);

      this.hiddenElement.style.overflow = "hidden";
      this.hiddenElement.style.position = "absolute";
      this.hiddenElement.style.height = "0";
      this.hiddenElement.style.width = "0";
      this.hiddenElement.style.visibility = "hidden";
      this.hiddenElement.style.padding = "0";
      this.hiddenElement.style.margin = "0";
      this.hiddenElement.style.float = "right";
      // this.hiddenElement.style.display = "none";

      this.hiddenElement.addEventListener("valid", this.handlevalid);
      this.hiddenElement.addEventListener("invalid", this.handleinvalid);

      while (this.attributequeue.length > 0) {
        const next = this.attributequeue.pop();
        if (next) {
          if (next[1] !== null) this.hiddenElement.setAttribute(next[0], next[1]);
          else this.hiddenElement.removeAttribute(next[0]);
        }
      }

      this.formElement.appendChild(this.hiddenElement);
    }
  }
  private updateHidden() {
    if (this.hiddenElement) {
      const valid = this.hiddenElement.checkValidity();
      if (!valid) {
        const validity = this.hiddenElement.validity;
        for (let type in validity) {
          if (!validity[type as FieldValidityStateName]) continue;

          if (this.customError && this.customError[type as FieldValidityStateName]) {
            if (this.errorText) {
              this.errorText.innerHTML = this.customError[type as FieldValidityStateName];
              this.isWarning = false;
              this.isError = true;
              return
            }
          }
          else if (this.customWarning && this.customWarning[type as FieldValidityStateName]) {
            if (this.warningText) {
              this.warningText.innerHTML = this.customWarning[type as FieldValidityStateName];
              this.isWarning = true;
              this.isError = false;
              return
            }
          }
          else {
            // we going to show the auto message as an error
            const auto_message = this.hiddenElement.validationMessage;
            if (this.errorText) {
              this.errorText.innerHTML = auto_message;
              this.isWarning = false;
              this.isError = true;
              return
            }
          }
        }
      }
      else {
        this.handlevalid();
      }
    }
  }

  // public functions
  public handlefocus = () => {
    // this.hasFocus = true;
    if (this.inputElement) {
      this.inputElement.focus();
    }
  }
  public checkValidity() {
    if (this.hiddenElement) return this.hiddenElement.checkValidity();
    return false;
  }
  public reportValidity() {
    if (this.hiddenElement) return this.hiddenElement.reportValidity();
    return false;
  }

  // class functions
  constructor(delay = 100) {
    super();

    this.debouncedInput = debounce(this.debouncedInput, delay);
    this.updateHidden = debounce(this.updateHidden, 10);
    super.addEventListener("form-element-loaded", this.handleformelementload);
  }
  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('focus', this.handlefocus);
  }
  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (ValidationAttributes.includes(name.toLowerCase())) {
      if (this.hiddenElement) {
        if (newValue) this.hiddenElement.setAttribute(name, newValue);
        else this.hiddenElement.removeAttribute(name);
      }
      else {
        this.attributequeue.push([name, newValue]);
      }
      if (this.inputElement) {
        if (newValue) this.inputElement.setAttribute(name, newValue);
        else this.inputElement.removeAttribute(name);
      }
    }
  }

  render(element: DocumentFragment, selector = "input") {
    if (element) {
      const input = element.querySelector<T>(selector);
      if (input && !input.hasAttribute('data-field-init')) {
        input.addEventListener('invalid', this.handleinvalid_field);
        input.addEventListener('valid', this.handlevalid_field);
        input.addEventListener('input', this.handleinput_field);
        input.addEventListener('change', this.handlechange_field);

        const type = input.getAttribute('type')
        if (type === "radio" || type === "checkbox") {
          if (this.checked) {
            input.setAttribute('checked', this.checked.toString());
          }
          else {
            input.removeAttribute("checked");
          }
        }
        else {
          if (this.value !== undefined) {
            input.setAttribute('value', this.value);
          }
        }

        if (this.readonly) input.setAttribute('readonly', 'true');

        input.setAttribute('data-field-init', 'true');
        this.inputElement = input;

        this.onvalueupdate(this.value);
      }
    }
    return html`
            <header part="header">
                <slot name="header"><pap-typography>${this.label || ""}</pap-typography></slot>
                ${this.maxLength ? html`<pap-typography><span class="counter"></span>/${this.maxLength}</pap-typography>` : ''}
            </header>
            <pap-box-template radius="${this.radius}" class="wrapper" part="wrapper">
                <slot name="prefix">${this._prefix}</slot>
                ${element ? element : '<slot></slot>'}
                <slot name="suffix">${this._suffix}</slot>
            </pap-box-template>
            <footer part="footer">
                <div class="warning">
                    <pap-icon name="warning"></pap-icon>
                    <pap-typography>This is a placeholder for warning</pap-typography>
                </div>
                <div class="error">
                    <pap-icon name="error"></pap-icon>
                    <pap-typography>This is a placeholder for error</pap-typography>
                </div>
            </footer>
            `
  }
}
// <!-- <slot name="footer"><pap-typography class="${this.message?.type || "hidden"}">${this.message?.message || ""}</pap-typography></slot> -->

declare global {
  interface HTMLElementTagNameMap {
    "pap-field-template": Field;
  }
}

## REGISTER-CODE

import { Field } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('pap-field-template')) {
  cElements.define('pap-field-template', Field);
}
PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and the types can you give me the following tables.

1. properties (columns: name, default-value, type, description)
2. events (columns: name - ex: 'click', type - ex: CustomEvent<ClickEvent>, description - when its being triggered etc)
3.public functions (columns: name, arguments - ex: arg1:CustomType, arg2?: boolean = true, arg3?: string, description - breif explenation what it does)

## SOURCE-CODE

 // utils
import { html, query, property, debounce, Radius, Size } from "@pap-it/system-utils";

// atoms
import { Typography } from "@pap-it/typography";
import "@pap-it/icon/wc";
import "@pap-it/typography/wc";

// templates
import { FormElement } from "@pap-it/templates-form-element";
import "@pap-it/templates-box/wc";

// local
import { style } from "./style";
import { FieldValidityState, FieldValidityStateName, Message, ValidationAttributes } from "./types";

export class Field<T extends HTMLElement = HTMLInputElement> extends FormElement {
  static styles = [style];

  // queries
  @query('.counter') public counterElement?: HTMLSpanElement;
  @query('.error > pap-typography') errorText?: Typography;
  @query('.warning > pap-typography') warningText?: Typography;

  @property({ type: Object }) message?: Message;
  @property() label?: string;
  @property({ rerender: false }) size: Size = "medium";
  @property({ rerender: false }) radius: Radius = "small";
  @property({ rerender: false, type: Boolean, onUpdate: "oncheckedupdate" }) checked?: boolean;
  @property({ rerender: false, type: Number }) tabIndex = 1;
  @property({ type: Boolean }) readonly: boolean = false;
  @property({ rerender: false, onUpdate: "onvalueupdate" }) value: string = "";

  // error/warning
  @property({ rerender: false, type: Object }) customError?: FieldValidityState;
  @property({ rerender: false, type: Object }) customWarning?: FieldValidityState;
  @property({ rerender: false, type: Boolean }) isError = false;
  @property({ rerender: false, type: Boolean }) isWarning = false;

  // common regulations
  @property({ rerender: false, type: Number }) max?: number;
  @property({ rerender: false, type: Number }) min?: number;
  @property({ rerender: false, type: Number }) maxLength?: number;

  @property({ type: Object, attribute: false }) protected _suffix?: DocumentFragment | string = "<span> </span>";
  @property({ type: Object, attribute: false }) protected_prefix?: DocumentFragment | string = "<span> </span>";

  public inputElement!: T;
  private hiddenElement?: HTMLInputElement;
  private attributequeue: [string, string | null][] = [];

  // on update functions
  private onvalueupdate = (value: string) => {
    if (!this.inputElement) return;

    const type = this.inputElement.getAttribute('type')
    if ('checked' in this.inputElement && (type === "radio" || type === "checkbox")) {
      this.checked = value === "true";
      this.inputElement.checked = this.checked;
      if (this.hiddenElement) {
        this.hiddenElement.checked = this.checked;
        this.hiddenElement.value = this.value;
        this.updateHidden();
      }

      if (!this.checked) {
        this.inputElement.removeAttribute("checked");
        if (this.hiddenElement) {
          this.hiddenElement.removeAttribute("checked");
          this.updateHidden();
        }
      }
    }
    else if ('value' in this.inputElement) {
      this.inputElement.value = this.value;
    }

    if (type === "radio" || type === "checkbox" || this.inputElement.getAttribute('data-tagname') === "select" || this.inputElement.tagName === "select") {
      this.inputElement.dispatchEvent(new Event('change'));
    }
    else {
      this.inputElement.dispatchEvent(new Event('input'));
    }
  }
  protected oncheckedupdate = (value: boolean) => {
    this.onvalueupdate(value.toString());
  }

  // event handlers
  private handleinvalid_field = (e: Event) => {
    console.log('invalid')
  }
  private handlevalid_field = (e: Event) => {
    console.log('valid');
  }
  protected handleinput_field = (e: Event) => {
    this.handlechange_field(e, false);

    this.dispatchEvent(new Event('input'));
    this.debouncedInput();

    if (this.maxLength && this.counterElement) {
      this.counterElement.innerHTML = this.value.length.toString();
    }
  }
  protected handlechange_field = (e: Event, dispatch = true) => {
    if (e.target instanceof HTMLElement) {
      const type = e.target.getAttribute('type')
      if ('checked' in e.target && (type === "radio" || type === "checkbox")) {
        // do something ?
        this.value = (e.target.checked || false).toString();
        if (this.hiddenElement) {
          this.hiddenElement.value = this.value;
          this.updateHidden();
        }
      }
      else if ('value' in e.target) {
        this.value = e.target.value as string;
        if (this.hiddenElement) {
          this.hiddenElement.value = this.value;
          this.updateHidden();
        }
      }

      if (dispatch) {
        this.dispatchEvent(new Event('change'))
      }
    }
  }
  private handleformelementload = () => {
    this.assignHiddenElement();
  }
  private handlevalid = () => {
    this.isError = false;
    this.isWarning = false;
  }
  private handleinvalid = (e: Event) => {
    // from a submit
    if (!(this.isError && this.isWarning)) this.updateHidden();
  }

  // private functions ¨
  protected debouncedInput = () => {
    this.dispatchEvent(new Event('debounced-input'));
  }
  private assignHiddenElement() {
    if (!this.formElement) this.findForm();
    if (!this.hiddenElement && this.getAttribute("name")) {
      // form in case of initial and not dynamic (most cases) needs to load ?
      this.hiddenElement = document.createElement("input");
      this.hiddenElement.value = this.value;
      this.hiddenElement.setAttribute('name', this.getAttribute("name") as string);

      this.hiddenElement.style.overflow = "hidden";
      this.hiddenElement.style.position = "absolute";
      this.hiddenElement.style.height = "0";
      this.hiddenElement.style.width = "0";
      this.hiddenElement.style.visibility = "hidden";
      this.hiddenElement.style.padding = "0";
      this.hiddenElement.style.margin = "0";
      this.hiddenElement.style.float = "right";
      // this.hiddenElement.style.display = "none";

      this.hiddenElement.addEventListener("valid", this.handlevalid);
      this.hiddenElement.addEventListener("invalid", this.handleinvalid);

      while (this.attributequeue.length > 0) {
        const next = this.attributequeue.pop();
        if (next) {
          if (next[1] !== null) this.hiddenElement.setAttribute(next[0], next[1]);
          else this.hiddenElement.removeAttribute(next[0]);
        }
      }

      this.formElement.appendChild(this.hiddenElement);
    }
  }
  private updateHidden() {
    if (this.hiddenElement) {
      const valid = this.hiddenElement.checkValidity();
      if (!valid) {
        const validity = this.hiddenElement.validity;
        for (let type in validity) {
          if (!validity[type as FieldValidityStateName]) continue;

          if (this.customError && this.customError[type as FieldValidityStateName]) {
            if (this.errorText) {
              this.errorText.innerHTML = this.customError[type as FieldValidityStateName];
              this.isWarning = false;
              this.isError = true;
              return
            }
          }
          else if (this.customWarning && this.customWarning[type as FieldValidityStateName]) {
            if (this.warningText) {
              this.warningText.innerHTML = this.customWarning[type as FieldValidityStateName];
              this.isWarning = true;
              this.isError = false;
              return
            }
          }
          else {
            // we going to show the auto message as an error
            const auto_message = this.hiddenElement.validationMessage;
            if (this.errorText) {
              this.errorText.innerHTML = auto_message;
              this.isWarning = false;
              this.isError = true;
              return
            }
          }
        }
      }
      else {
        this.handlevalid();
      }
    }
  }

  // public functions
  public handlefocus = () => {
    // this.hasFocus = true;
    if (this.inputElement) {
      this.inputElement.focus();
    }
  }
  public checkValidity() {
    if (this.hiddenElement) return this.hiddenElement.checkValidity();
    return false;
  }
  public reportValidity() {
    if (this.hiddenElement) return this.hiddenElement.reportValidity();
    return false;
  }

  // class functions
  constructor(delay = 100) {
    super();

    this.debouncedInput = debounce(this.debouncedInput, delay);
    this.updateHidden = debounce(this.updateHidden, 10);
    super.addEventListener("form-element-loaded", this.handleformelementload);
  }
  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('focus', this.handlefocus);
  }
  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (ValidationAttributes.includes(name.toLowerCase())) {
      if (this.hiddenElement) {
        if (newValue) this.hiddenElement.setAttribute(name, newValue);
        else this.hiddenElement.removeAttribute(name);
      }
      else {
        this.attributequeue.push([name, newValue]);
      }
      if (this.inputElement) {
        if (newValue) this.inputElement.setAttribute(name, newValue);
        else this.inputElement.removeAttribute(name);
      }
    }
  }

  render(element: DocumentFragment, selector = "input") {
    if (element) {
      const input = element.querySelector<T>(selector);
      if (input && !input.hasAttribute('data-field-init')) {
        input.addEventListener('invalid', this.handleinvalid_field);
        input.addEventListener('valid', this.handlevalid_field);
        input.addEventListener('input', this.handleinput_field);
        input.addEventListener('change', this.handlechange_field);

        const type = input.getAttribute('type')
        if (type === "radio" || type === "checkbox") {
          if (this.checked) {
            input.setAttribute('checked', this.checked.toString());
          }
          else {
            input.removeAttribute("checked");
          }
        }
        else {
          if (this.value !== undefined) {
            input.setAttribute('value', this.value);
          }
        }

        if (this.readonly) input.setAttribute('readonly', 'true');

        input.setAttribute('data-field-init', 'true');
        this.inputElement = input;

        this.onvalueupdate(this.value);
      }
    }
    return html`
            <header part="header">
                <slot name="header"><pap-typography>${this.label || ""}</pap-typography></slot>
                ${this.maxLength ? html`<pap-typography><span class="counter"></span>/${this.maxLength}</pap-typography>` : ''}
            </header>
            <pap-box-template radius="${this.radius}" class="wrapper" part="wrapper">
                <slot name="prefix">${this._prefix}</slot>
                ${element ? element : '<slot></slot>'}
                <slot name="suffix">${this._suffix}</slot>
            </pap-box-template>
            <footer part="footer">
                <div class="warning">
                    <pap-icon name="warning"></pap-icon>
                    <pap-typography>This is a placeholder for warning</pap-typography>
                </div>
                <div class="error">
                    <pap-icon name="error"></pap-icon>
                    <pap-typography>This is a placeholder for error</pap-typography>
                </div>
            </footer>
            `
  }
}
// <!-- <slot name="footer"><pap-typography class="${this.message?.type || "hidden"}">${this.message?.message || ""}</pap-typography></slot> -->

declare global {
  interface HTMLElementTagNameMap {
    "pap-field-template": Field;
  }
}

## TYPE-CODE: export type MessageType = ""

export type Message = {
  type: MessageType;
  message: string;
}

export type FieldValidityStateName = "badInput" | "customError" | "patternMismatch" | "rangeOverflow" | "rangeUnderflow" | "stepMismatch" | "tooLong" | "tooShort" | "typeMismatch" | "valid" | "valueMissing";

export type FieldValidityState = {
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/ValidityState/badInput) */
  badInput: string;
  customError: string;
  /**[MDN Reference](https://developer.mozilla.org/docs/Web/API/ValidityState/patternMismatch) */
  patternMismatch: string;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/ValidityState/rangeOverflow) */
  rangeOverflow: string;
  /**[MDN Reference](https://developer.mozilla.org/docs/Web/API/ValidityState/rangeUnderflow) */
  rangeUnderflow: string;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/ValidityState/stepMismatch) */
  stepMismatch: string;
  /**[MDN Reference](https://developer.mozilla.org/docs/Web/API/ValidityState/tooLong) */
  tooLong: string;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/ValidityState/tooShort) */
  tooShort: string;
  /**[MDN Reference](https://developer.mozilla.org/docs/Web/API/ValidityState/typeMismatch)*/
  typeMismatch: string;
  valid: string;
  valueMissing: string;
}

export const ValidationAttributes = ["min", "max", "pattern", "type", "minlenght", "maxlenght", "required", "multiple", "novalidate", "formnovalidate", "autofocus"]PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and style code probided. Can you create a documentation that includes titles, short descrition and the table for each tables: css-variables, parts, slots.
css-variables should be a table with columns: (name, default-value, type - ex. CSS unit, description).
parts should include all elements that have been exposed with the part attribute ex: <p part='foo'> - and the table should then include columns: (name, description (short)).
slots should include columns: (name, default-value, description)

## SOURCE-CODE

// utils
import { html, query, property, debounce, Radius, Size } from "@pap-it/system-utils";

// atoms
import { Typography } from "@pap-it/typography";
import "@pap-it/icon/wc";
import "@pap-it/typography/wc";

// templates
import { FormElement } from "@pap-it/templates-form-element";
import "@pap-it/templates-box/wc";

// local
import { style } from "./style";
import { FieldValidityState, FieldValidityStateName, Message, ValidationAttributes } from "./types";

export class Field<T extends HTMLElement = HTMLInputElement> extends FormElement {
  static styles = [style];

  // queries
  @query('.counter') public counterElement?: HTMLSpanElement;
  @query('.error > pap-typography') errorText?: Typography;
  @query('.warning > pap-typography') warningText?: Typography;

  @property({ type: Object }) message?: Message;
  @property() label?: string;
  @property({ rerender: false }) size: Size = "medium";
  @property({ rerender: false }) radius: Radius = "small";
  @property({ rerender: false, type: Boolean, onUpdate: "oncheckedupdate" }) checked?: boolean;
  @property({ rerender: false, type: Number }) tabIndex = 1;
  @property({ type: Boolean }) readonly: boolean = false;
  @property({ rerender: false, onUpdate: "onvalueupdate" }) value: string = "";

  // error/warning
  @property({ rerender: false, type: Object }) customError?: FieldValidityState;
  @property({ rerender: false, type: Object }) customWarning?: FieldValidityState;
  @property({ rerender: false, type: Boolean }) isError = false;
  @property({ rerender: false, type: Boolean }) isWarning = false;

  // common regulations
  @property({ rerender: false, type: Number }) max?: number;
  @property({ rerender: false, type: Number }) min?: number;
  @property({ rerender: false, type: Number }) maxLength?: number;

  @property({ type: Object, attribute: false }) protected _suffix?: DocumentFragment | string = "<span> </span>";
  @property({ type: Object, attribute: false }) protected_prefix?: DocumentFragment | string = "<span> </span>";

  public inputElement!: T;
  private hiddenElement?: HTMLInputElement;
  private attributequeue: [string, string | null][] = [];

  // on update functions
  private onvalueupdate = (value: string) => {
    if (!this.inputElement) return;

    const type = this.inputElement.getAttribute('type')
    if ('checked' in this.inputElement && (type === "radio" || type === "checkbox")) {
      this.checked = value === "true";
      this.inputElement.checked = this.checked;
      if (this.hiddenElement) {
        this.hiddenElement.checked = this.checked;
        this.hiddenElement.value = this.value;
        this.updateHidden();
      }

      if (!this.checked) {
        this.inputElement.removeAttribute("checked");
        if (this.hiddenElement) {
          this.hiddenElement.removeAttribute("checked");
          this.updateHidden();
        }
      }
    }
    else if ('value' in this.inputElement) {
      this.inputElement.value = this.value;
    }

    if (type === "radio" || type === "checkbox" || this.inputElement.getAttribute('data-tagname') === "select" || this.inputElement.tagName === "select") {
      this.inputElement.dispatchEvent(new Event('change'));
    }
    else {
      this.inputElement.dispatchEvent(new Event('input'));
    }
  }
  protected oncheckedupdate = (value: boolean) => {
    this.onvalueupdate(value.toString());
  }

  // event handlers
  private handleinvalid_field = (e: Event) => {
    console.log('invalid')
  }
  private handlevalid_field = (e: Event) => {
    console.log('valid');
  }
  protected handleinput_field = (e: Event) => {
    this.handlechange_field(e, false);

    this.dispatchEvent(new Event('input'));
    this.debouncedInput();

    if (this.maxLength && this.counterElement) {
      this.counterElement.innerHTML = this.value.length.toString();
    }
  }
  protected handlechange_field = (e: Event, dispatch = true) => {
    if (e.target instanceof HTMLElement) {
      const type = e.target.getAttribute('type')
      if ('checked' in e.target && (type === "radio" || type === "checkbox")) {
        // do something ?
        this.value = (e.target.checked || false).toString();
        if (this.hiddenElement) {
          this.hiddenElement.value = this.value;
          this.updateHidden();
        }
      }
      else if ('value' in e.target) {
        this.value = e.target.value as string;
        if (this.hiddenElement) {
          this.hiddenElement.value = this.value;
          this.updateHidden();
        }
      }

      if (dispatch) {
        this.dispatchEvent(new Event('change'))
      }
    }
  }
  private handleformelementload = () => {
    this.assignHiddenElement();
  }
  private handlevalid = () => {
    this.isError = false;
    this.isWarning = false;
  }
  private handleinvalid = (e: Event) => {
    // from a submit
    if (!(this.isError && this.isWarning)) this.updateHidden();
  }

  // private functions ¨
  protected debouncedInput = () => {
    this.dispatchEvent(new Event('debounced-input'));
  }
  private assignHiddenElement() {
    if (!this.formElement) this.findForm();
    if (!this.hiddenElement && this.getAttribute("name")) {
      // form in case of initial and not dynamic (most cases) needs to load ?
      this.hiddenElement = document.createElement("input");
      this.hiddenElement.value = this.value;
      this.hiddenElement.setAttribute('name', this.getAttribute("name") as string);

      this.hiddenElement.style.overflow = "hidden";
      this.hiddenElement.style.position = "absolute";
      this.hiddenElement.style.height = "0";
      this.hiddenElement.style.width = "0";
      this.hiddenElement.style.visibility = "hidden";
      this.hiddenElement.style.padding = "0";
      this.hiddenElement.style.margin = "0";
      this.hiddenElement.style.float = "right";
      // this.hiddenElement.style.display = "none";

      this.hiddenElement.addEventListener("valid", this.handlevalid);
      this.hiddenElement.addEventListener("invalid", this.handleinvalid);

      while (this.attributequeue.length > 0) {
        const next = this.attributequeue.pop();
        if (next) {
          if (next[1] !== null) this.hiddenElement.setAttribute(next[0], next[1]);
          else this.hiddenElement.removeAttribute(next[0]);
        }
      }

      this.formElement.appendChild(this.hiddenElement);
    }
  }
  private updateHidden() {
    if (this.hiddenElement) {
      const valid = this.hiddenElement.checkValidity();
      if (!valid) {
        const validity = this.hiddenElement.validity;
        for (let type in validity) {
          if (!validity[type as FieldValidityStateName]) continue;

          if (this.customError && this.customError[type as FieldValidityStateName]) {
            if (this.errorText) {
              this.errorText.innerHTML = this.customError[type as FieldValidityStateName];
              this.isWarning = false;
              this.isError = true;
              return
            }
          }
          else if (this.customWarning && this.customWarning[type as FieldValidityStateName]) {
            if (this.warningText) {
              this.warningText.innerHTML = this.customWarning[type as FieldValidityStateName];
              this.isWarning = true;
              this.isError = false;
              return
            }
          }
          else {
            // we going to show the auto message as an error
            const auto_message = this.hiddenElement.validationMessage;
            if (this.errorText) {
              this.errorText.innerHTML = auto_message;
              this.isWarning = false;
              this.isError = true;
              return
            }
          }
        }
      }
      else {
        this.handlevalid();
      }
    }
  }

  // public functions
  public handlefocus = () => {
    // this.hasFocus = true;
    if (this.inputElement) {
      this.inputElement.focus();
    }
  }
  public checkValidity() {
    if (this.hiddenElement) return this.hiddenElement.checkValidity();
    return false;
  }
  public reportValidity() {
    if (this.hiddenElement) return this.hiddenElement.reportValidity();
    return false;
  }

  // class functions
  constructor(delay = 100) {
    super();

    this.debouncedInput = debounce(this.debouncedInput, delay);
    this.updateHidden = debounce(this.updateHidden, 10);
    super.addEventListener("form-element-loaded", this.handleformelementload);
  }
  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('focus', this.handlefocus);
  }
  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (ValidationAttributes.includes(name.toLowerCase())) {
      if (this.hiddenElement) {
        if (newValue) this.hiddenElement.setAttribute(name, newValue);
        else this.hiddenElement.removeAttribute(name);
      }
      else {
        this.attributequeue.push([name, newValue]);
      }
      if (this.inputElement) {
        if (newValue) this.inputElement.setAttribute(name, newValue);
        else this.inputElement.removeAttribute(name);
      }
    }
  }

  render(element: DocumentFragment, selector = "input") {
    if (element) {
      const input = element.querySelector<T>(selector);
      if (input && !input.hasAttribute('data-field-init')) {
        input.addEventListener('invalid', this.handleinvalid_field);
        input.addEventListener('valid', this.handlevalid_field);
        input.addEventListener('input', this.handleinput_field);
        input.addEventListener('change', this.handlechange_field);

        const type = input.getAttribute('type')
        if (type === "radio" || type === "checkbox") {
          if (this.checked) {
            input.setAttribute('checked', this.checked.toString());
          }
          else {
            input.removeAttribute("checked");
          }
        }
        else {
          if (this.value !== undefined) {
            input.setAttribute('value', this.value);
          }
        }

        if (this.readonly) input.setAttribute('readonly', 'true');

        input.setAttribute('data-field-init', 'true');
        this.inputElement = input;

        this.onvalueupdate(this.value);
      }
    }
    return html`
            <header part="header">
                <slot name="header"><pap-typography>${this.label || ""}</pap-typography></slot>
                ${this.maxLength ? html`<pap-typography><span class="counter"></span>/${this.maxLength}</pap-typography>` : ''}
            </header>
            <pap-box-template radius="${this.radius}" class="wrapper" part="wrapper">
                <slot name="prefix">${this._prefix}</slot>
                ${element ? element : '<slot></slot>'}
                <slot name="suffix">${this._suffix}</slot>
            </pap-box-template>
            <footer part="footer">
                <div class="warning">
                    <pap-icon name="warning"></pap-icon>
                    <pap-typography>This is a placeholder for warning</pap-typography>
                </div>
                <div class="error">
                    <pap-icon name="error"></pap-icon>
                    <pap-typography>This is a placeholder for error</pap-typography>
                </div>
            </footer>
            `
  }
}
// <!-- <slot name="footer"><pap-typography class="${this.message?.type || "hidden"}">${this.message?.message || ""}</pap-typography></slot> -->

declare global {
  interface HTMLElementTagNameMap {
    "pap-field-template": Field;
  }
}

## STYLE-CODE

$size-map: (
  small: (
    height: var(--field-size-small, 32px),
    blockheight: var(--field-size-small, 32px),
    padding: var(--padding-small, 8px),
  ),
  medium: (
    height: var(--field-size-medium, 40px),
    blockheight: var(--field-size-small, 32px),
    padding: var(--padding-medium, 16px),
  ),
  large: (
    height: var(--field-size-large, 56px),
    blockheight: var(--field-size-small, 32px),
    padding: var(--padding-medium, 16px),
  ),
);

@each $name, $value in $size-map {
    :host([size="#{$name}"]) {
        pap-box-template.wrapper {
            height: var(--pap-field-height-#{$name}, #{map-get($value, height)});
        }
        footer,
        header {
            height: var(--pap-field-block-height-#{$name}, #{map-get($value, blockheight)});
        }
    }
}

:host {
    --border: var(--pap-field-background-color-light, var(--pap-color-black, black));
    --outline: var(--pap-field-background-color-light, rgb(90, 46, 250));
    --color: var(--pap-field-text-color-light, var(--pap-color-black, black));

    display: block;
    color: var(--color);

    footer,
    header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-inline: var(--padding-small, 8px);
    }

    footer {
        div {
            display: none;
            align-items: center;
            gap: var(--gap-small, 8px);
        }
    }

    pap-box-template.wrapper {
        box-sizing: border-box;
        position: relative;
        display: flex;
        align-items: center;
        padding-inline: var(--padding-medium, 16px);
        border: 1px solid var(--border);

        ::slotted(*:not([slot])),        
        input, select, textarea {
            color: inherit;

            font-family: var(--input-fontfamily, var(--typography-c3-fontfamily, 'Libre Franklin', helvetica, sans-serif));
            font-size: var(--input-fontsize, var(--typography-c3-fontsize, 16px));
            font-weight: var(--input-fontweight, var(--typography-c3-fontweight, 400));
            line-height: var(--input-lineheight, var(--typography-c3-lineheight, 24px));
            letter-spacing: var(--input-letterspacing, var(--typography-c3-letterspacing, 0.01em));
            
            flex-grow: 1;
            display: block;
            border: none;
            background-color: transparent;
            outline: none !important;
        }

        ::slotted(*[slot="prefix"]) {
            margin-right: var(--gap-small, 8px);
        }
        ::slotted(*[slot="suffix"]) {
            margin-left: var(--gap-small, 8px);
        }
    }

    &:focus {
        outline: none;
    }
}
// :host([isSuccess="true"]) {
//     footer {
//         div:not(.error) {
//             display: none;
//         }
//         div.error {
//             display: flex;
//         }
//     }
// }
:host([isWarning="true"]) {
    footer {
        div:not(.warning) {
            display: none;
        }
        div.warning {
            display: flex;
        }
    }
}
:host([isError="true"]) {
    footer {
        div:not(.error) {
            display: none;
        }
        div.error {
            display: flex;
        }
    }
}

:host([hasfocus="true"]),
:host(:focus) {
    outline: none;

    pap-box-template.wrapper {
        outline: 1px solid var(--outline);
    }
}

@media (prefers-color-scheme: dark) {
    :host {
        --border: var(--pap-field-background-color-dark, var(--pap-color-black, white));
        --outline: var(--pap-field-background-color-dark, rgb(195, 211, 255));
        --color: var(--pap-field-text-color-dark, var(--pap-color-black, white));
    }
}
