// utils 
import { html, query, property, debounce, Radius, Size, ExtractSlotValue } from "@pap-it/system-utils";

// atoms
import { Typography } from "@pap-it/typography";
import "@pap-it/icon/wc";
import "@pap-it/typography/wc";

// templates
import { FormElementTemplate } from "@pap-it/templates-form-element";
import "@pap-it/templates-box/wc";
import "@pap-it/templates-prefix-suffix/wc";

// local 
import { style } from "./style";
import { FieldValidityState, FieldValidityStateName, Message, MessageType, ValidationAttributes } from "./types";

export class FieldTemplate<T extends HTMLElement = HTMLInputElement> extends FormElementTemplate {
  static styles = [style];

  // queries
  @query('.counter') public counterElement?: HTMLSpanElement;
  @query('.message > pap-typography') messageText?: Typography;

  @property() message?: string;
  @property({ attribute: "message-type" }) messageType?: MessageType;
  @property() label?: string;
  @property() radius: Radius = "small";
  @property({ rerender: false }) size: Size = "medium";
  @property({ rerender: false, type: Boolean, onUpdate: "oncheckedupdate" }) checked?: boolean;
  @property({ rerender: false, type: Number }) tabIndex: number = 1;
  @property({ type: Boolean }) readonly: boolean = false;
  @property({ rerender: false, onUpdate: "onvalueupdate" }) value: string = "";
  @property({ type: Boolean, rerender: false }) private footerslotcontent: boolean = false;
  @property({ type: Boolean, rerender: false }) private headerslotcontent: boolean = false;

  // error/warning 
  @property({ rerender: false, type: Object, onUpdate: 'oncustommessageupdate' }) customError?: FieldValidityState;
  @property({ rerender: false, type: Object, onUpdate: 'oncustommessageupdate' }) customWarning?: FieldValidityState;

  // common regulations
  @property({ rerender: false, type: Number }) max?: number;
  @property({ rerender: false, type: Number }) min?: number;
  @property({ rerender: false, type: Number }) maxLength?: number;

  @property({ type: Object, attribute: false }) protected _suffix?: DocumentFragment | string = "<span> </span>";
  @property({ type: Object, attribute: false }) protected _prefix?: DocumentFragment | string = "<span> </span>";

  public inputElement!: T;
  private hiddenElement?: HTMLInputElement;
  private attributequeue: [string, string | null][] = [];
  private helpertext?: string;
  private passedInitialChange = false; // used to not dispatch value change on init

  // class functions
  constructor(delay = 100) {
    super();

    this.debouncedInput = debounce(this.debouncedInput, delay);
    this.validitycheck = debounce(this.validitycheck, 10);
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

  // on update functions
  protected onvalueupdate = (value: string) => {
    if (!this.inputElement)
      return 0;

    const type = this.inputElement.getAttribute('type')
    if ('checked' in this.inputElement && (type === "radio" || type === "checkbox")) {
      this.checked = value === "true";
      this.inputElement.checked = this.checked;
      if (this.hiddenElement) {
        this.hiddenElement.checked = this.checked;
        this.hiddenElement.value = this.value;
        this.validitycheck();
      }

      if (!this.checked) {
        this.inputElement.removeAttribute("checked");
        if (this.hiddenElement) {
          this.hiddenElement.removeAttribute("checked");
          this.validitycheck();
        }
      }
    }
    else if ('value' in this.inputElement) {
      this.inputElement.value = this.value;
    }

    if (this.passedInitialChange) {
      if (type === "radio" || type === "checkbox" || this.inputElement.getAttribute('data-tagname') === "select" || this.inputElement.tagName === "select")
        this.inputElement.dispatchEvent(new Event('change'));
      else
        this.inputElement.dispatchEvent(new Event('input'));
    }
    else {
      this.passedInitialChange = true;
    }

    this.dispatchEvent(new Event('after-update'));
  }
  private oncustommessageupdate = () => {
    this.assignHiddenElement();
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
          this.validitycheck();
        }
      }
      else if ('value' in e.target) {
        this.value = e.target.value as string;
        if (this.hiddenElement) {
          this.hiddenElement.value = this.value;
          this.validitycheck();
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
    this.messageType = undefined;
    this.message = this.helpertext;
  }
  private handleinvalid = (e: Event) => {
    // from a submit 
    if (!this.messageType) this.validitycheck();
  }
  private handlefooterslotchange = (e: Event) => {
    if (e.target instanceof HTMLSlotElement) {
      const values = ExtractSlotValue(e.target);

      if (values.length > 0) {
        this.footerslotcontent = true;
      }
      else {
        this.footerslotcontent = false;
      }
    }
  }
  private handleheaderslotchange = (e: Event) => {
    if (e.target instanceof HTMLSlotElement) {
      const values = ExtractSlotValue(e.target);

      if (values.length > 0) {
        this.headerslotcontent = true;
      }
      else {
        this.headerslotcontent = false;
      }
    }
  }

  // private functions ¨
  protected debouncedInput = () => {
    this.dispatchEvent(new Event('debounced-input'));
  }
  private assignHiddenElement() {
    if (!this.formElement) this.findForm();
    if (!this.hiddenElement && (this.getAttribute("name") || this.customError || this.customWarning)) {
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

      if (this.formElement) this.formElement.appendChild(this.hiddenElement);
    }
  }
  private validitycheck() {

    if (this.hiddenElement) {
      const valid = this.hiddenElement.checkValidity();
      if (!valid) {
        if (this.helpertext !== this.message && !this.messageType && this.message) {
          this.helpertext = this.message;
        }

        const validity = this.hiddenElement.validity;
        for (let type in validity) {
          if (!validity[type as FieldValidityStateName]) continue;

          if (this.customError && this.customError[type as FieldValidityStateName]) {
            this.message = this.customError[type as FieldValidityStateName];
            this.messageType = "error"
            return
          }
          else if (this.customWarning && this.customWarning[type as FieldValidityStateName]) {
            this.message = this.customWarning[type as FieldValidityStateName];
            this.messageType = "warning"
            return
          }
          else {
            // we going to show the auto message as an error
            this.message = this.hiddenElement.validationMessage;
            this.messageType = "error"
            return
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

  render(element: DocumentFragment, selector = "input") {
    if (element && !this.inputElement) {
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
        <slot @slotchange="${this.handleheaderslotchange}" name="header"><pap-typography>${this.label || ""}</pap-typography></slot>
        ${this.maxLength ? html`<pap-typography><span class="counter">0</span>/${this.maxLength}</pap-typography>` : ''}
      </header>

      <pap-box-template radius="${this.radius}" class="wrapper" part="wrapper">
        <pap-prefix-suffix-template streched>
          <slot slot="prefix" name="prefix">${this._prefix}</slot>
          ${element ? element : '<slot></slot>'}
          <slot slot="suffix" name="suffix">${this._suffix}</slot>
        </pap-prefix-suffix-template>
      </pap-box-template>

      <footer part="footer">
        <div class="message">
          <pap-icon name=${this.messageType ? this.messageType : ''}></pap-icon>
          <pap-typography>${this.message}</pap-typography>
        </div>
        <slot @slotchange="${this.handlefooterslotchange}" name="footer"></slot>
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