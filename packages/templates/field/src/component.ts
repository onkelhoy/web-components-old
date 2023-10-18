// utils 
import { html, query, property, suspense, Radius, Size } from "@pap-it/system-utils";

// atoms
import { Typography } from "@pap-it/typography";
import "@pap-it/icon/wc";
import "@pap-it/typography/wc";

// templates
import { FormElementTemplate } from "@pap-it/templates-form-element";
import "@pap-it/templates-box/wc";

// local 
import { style } from "./style";
import { FieldValidityState, FieldValidityStateName, Message, ValidationAttributes } from "./types";

export class FieldTemplate<T extends HTMLElement = HTMLInputElement> extends FormElementTemplate {
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
  @property({ type: Object, attribute: false }) protected _prefix?: DocumentFragment | string = "<span> </span>";

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
    this.dispatchEvent(new Event('suspended-input'));
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

    this.debouncedInput = suspense(this.debouncedInput, delay);
    this.updateHidden = suspense(this.updateHidden, 10);
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
    "pap-field-template": FieldTemplate;
  }
}