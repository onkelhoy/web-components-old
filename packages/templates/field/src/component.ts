// system
import { Radius, Size, debounce, html, ifDefined, property, CustomElementSetting, RenderType } from "@pap-it/system-utils";

// atoms
import "@pap-it/icon/wc";
import "@pap-it/typography/wc";

// templates
import "@pap-it/templates-prefix-suffix/wc";
import "@pap-it/templates-box/wc";
import { FormElement } from "@pap-it/templates-form-element";

// local 
import { ValidityStateObject, Mode, State, RenderArgument, PrefixSuffixRender } from "./types";
import { style } from "./style";

export class Field extends FormElement {
  static styles = [style];

  @property({ rerender: false, attribute: 'custom-error', type: Object }) customDanger?: Partial<ValidityStateObject>;
  @property({ rerender: false, attribute: 'custom-warning', type: Object }) customWarning?: Partial<ValidityStateObject>;
  @property() label?: string;
  @property({
    type: Boolean,
    after: function (this: Field, value?: boolean) {
      if (value) {
        this.setAttribute('aria-required', 'true');
      }
      else {
        this.setAttribute('aria-required', 'false');
      }
    }
  }) required?: boolean;
  @property({
    type: Boolean,
    after: function (this: Field, value?: boolean) {
      if (value) {
        this.setAttribute('aria-readonly', 'true');
      }
      else {
        this.setAttribute('aria-readonly', 'false');
      }
    }
  }) readonly?: boolean;
  @property() placeholder?: string;
  @property({ rerender: false }) size?: Size = "medium";
  @property({ rerender: false }) mode?: Mode = "fill";
  @property() radius?: Radius = "medium";
  @property({
    set: function (this: Field, value?: string) {
      if (!value || value === "null") return "default";
      return value;
    },
    after: function (this: Field) {
      if (!this.internalstate) this.fallbackstate = this.state || "default";
      this.internalstate = false;
    }
  }) state?: State = "default";
  @property({
    set: function (this: Field, value?: string) {
      if (value === "null") return undefined;
      return value;
    },
    after: function (this: Field) {
      if (!this.internalmessage) {
        this.fallbackmessage = this.message || undefined;
      }
      this.internalmessage = false;
    }
  }) message?: string;
  @property({
    type: Boolean,
    rerender: false,
    set: function (this: Field, value: boolean) {
      if (this.outsideheader === true) return true;
      return value;
    },
    after: function (this: Field) {
      if (!this.internalheader) {
        this.outsideheader = this.header;
      }

      this.internalheader = false;
    }
  }) header: boolean = false;
  @property({
    type: Boolean,
    rerender: false,
    set: function (this: Field, value: boolean) {
      if (this.outsidefooter === true) return true;
      return value;
    },
    after: function (this: Field) {
      if (!this.internalfooter) {
        this.outsidefooter = this.footer;
      }

      this.internalfooter = false;
    }
  }) footer: boolean = false;

  public customValidation?: (target: Field) => { message: string; state: State } | undefined;

  // footer & header flags to prevent ignore
  private outsideheader = false;
  private internalheader = false;
  private outsidefooter = false;
  private internalfooter = false;

  private internalmessage = false;
  private fallbackmessage?: string;
  private internalstate = false;
  private fallbackstate: State = "default";
  private slotelements: Record<string, number> = {};

  constructor(config?: Partial<CustomElementSetting>) {
    super({ ...(config || {}), noblur: true, nofocus: true, delegatesFocus: true });
    // TODO VERY IMPORTANT FEATURE NEEDED BUT BLOCKED BY NATURE OF DECORATOR
    // this.attachShadow({ mode: 'open', delegatesFocus: true });
    // console.log('attatch window');

    // super({ ...(config || {}), noblur: true, nofocus: true, delegatesFocus: true });
    this.slotvisibility = debounce(this.slotvisibility, 10);
  }

  // private functions
  protected override connectElement(element: HTMLElement) {
    super.connectElement(element);

    element.addEventListener('focus', () => {
      (this as any).hasFocus = true;
    });
    element.addEventListener('blur', () => {
      (this as any).hasFocus = false;
    });
  }
  // NOTE this function is called inside the debouncedInput so we dont need to overload with calls
  protected override validateElement() {

    if (this.customValidation) {
      const ret = this.customValidation(this);
      if (ret) {
        this.setMessage(ret.message, ret.state);
        return;
      }
    }

    const validity = this.validity;
    if (validity.valid) {
      this.setMessage();
      return;
    }

    for (const name in validity) {
      const vname = name as keyof ValidityState;
      if (!validity[vname]) continue; // skip valid stuff

      if (this.customDanger && this.customDanger[vname]) {
        this.setMessage(this.customDanger[vname], 'danger');
        break;
      }
      else if (this.customWarning && this.customWarning[vname]) {
        this.setMessage(this.customWarning[vname], 'warning');
        break;
      }
      else {
        this.setMessage(this.validationMessage, 'danger');
        break;
      }
    }
  }
  public setMessage(message?: string, state?: State) {
    this.internalmessage = true;
    this.internalstate = true;
    this.message = message || this.fallbackmessage;
    this.state = state || this.fallbackstate;
  }
  private getFooterPrefixSlot() {
    if (!this.message) return "";

    switch (this.state) {
      case "danger":
        return '<pap-icon cache="true" name="danger" slot="prefix"></pap-icon>';
      case "warning":
        return '<pap-icon cache="true" name="warning" slot="prefix"></pap-icon>';
      case "info":
        return '<pap-icon cache="true" name="info" slot="prefix"></pap-icon>';
      case "success":
        return '<pap-icon cache="true" name="success" slot="prefix"></pap-icon>';
      default:
        return "";
    }
  }

  private handleslotchange = (e: Event) => {
    if (e.target instanceof HTMLSlotElement) {
      const name = e.target.getAttribute('name');
      if (typeof name === "string") {
        const assignedNodes = e.target.assignedNodes();
        this.slotelements[name] = assignedNodes.length;
        this.slotvisibility();
      }
    }
  }
  private slotvisibility() {
    let header = 0;
    let footer = 0;
    for (const name in this.slotelements) {
      if (name.startsWith('header')) header += this.slotelements[name];
      else footer += this.slotelements[name];
    }

    this.internalheader = true;
    this.header = header !== 0;
    this.internalfooter = true;
    this.footer = footer !== 0;
  }

  // render functions 
  protected renderHeader(header?: PrefixSuffixRender) {
    if (header) {
      this.header = true;
    }

    return html`
      <pap-prefix-suffix-template part="header">
        <slot @slotchange="${this.handleslotchange}" slot="prefix" name="header-prefix"></slot>
        <slot @slotchange="${this.handleslotchange}" name="header"></slot>
        <slot @slotchange="${this.handleslotchange}" slot="suffix" name="header-suffix"></slot>

        ${header?.prefix}
        ${header?.content}
        ${header?.suffix}
      </pap-prefix-suffix-template>
    `
  }
  protected renderFooter(footer?: PrefixSuffixRender) {
    if (footer) {
      this.header = true;
    }

    return html`
      <pap-prefix-suffix-template part="footer">
        ${footer?.prefix}
        ${footer?.content}
        ${footer?.suffix}

        <slot @slotchange="${this.handleslotchange}" slot="prefix" name="footer-prefix"></slot>
        ${this.getFooterPrefixSlot()}
        <slot @slotchange="${this.handleslotchange}" name="footer"></slot>
        ${this.message ? `<pap-typography variant="C4" key="message" part="message">${this.message}</pap-typography>` : ''}
        <slot @slotchange="${this.handleslotchange}" slot="suffix" name="footer-suffix"></slot>
      </pap-prefix-suffix-template>
    `
  }
  protected renderMain(main?: PrefixSuffixRender) {
    return html`
      <pap-box-template part="main" radius="${ifDefined(this.radius)}">
        <pap-prefix-suffix-template part="prefix-suffix">
          <slot slot="prefix" name="prefix"></slot>
          ${main?.prefix}
          ${main?.content}
          ${main?.suffix}
          <slot slot="suffix" name="suffix"></slot>
        </pap-prefix-suffix-template>
      </pap-box-template>
    `
  }

  render(render?: RenderArgument): RenderType {
    return html`
      ${this.renderHeader(render?.header)}
      ${this.renderMain(render?.main)}
      ${this.renderFooter(render?.footer)}
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pap-field-template": Field;
  }
}