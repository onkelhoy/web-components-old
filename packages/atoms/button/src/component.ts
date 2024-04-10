// system
import { property, Size, Radius } from '@pap-it/system-utils';

// templates
import { FormElement } from '@pap-it/templates-form-element';
import "@pap-it/templates-prefix-suffix/wc";

import { style } from './style.js';

import type { ButtonMode, ButtonVariant, ButtonColorVariant, ButtonTextType } from './types';

// TODO extend form-element-template
export class Button extends FormElement {
  static style = style;

  @property({ rerender: false }) type: "button" | "submit" | "reset" = "button";
  @property({ rerender: false }) size: Size = "medium";
  @property({ rerender: false }) radius: Radius = "circular";
  @property({ rerender: false }) href?: string;
  @property({ rerender: false, type: Boolean }) circle: boolean = false;
  @property({ rerender: false, type: Boolean }) loading: boolean = false;
  @property({ rerender: false, attribute: 'text-variant' }) textvariant: ButtonTextType = "B1"; // TODO attribute: 'text-variant'
  @property({ rerender: false }) mode: ButtonMode = "hug";
  @property({ rerender: false }) variant: ButtonVariant = "filled";
  @property({ rerender: false }) color: ButtonColorVariant = "primary";
  @property({
    rerender: false,
    attribute: 'touch-target',
    set: function (this: Button, value: string) {
      if (value === "true") {
        return "44px";
      }
      else if (value === "false") {
        return "auto";
      }

      return value;
    },
    before: function (this: Button, value: string) {
      this.style.setProperty("--button-touch-target", value);
    }
  }) touchtarget: string = "44px";

  connectedCallback(): void {
    super.connectedCallback();

    this.addEventListener("click", this.handleclick, true);

    window.addEventListener('keyup', this.handlekeyup);
    // NOTE should this be a standard?
    this.role = "button";
  }
  disconnectedCallback(): void {
    super.disconnectedCallback();

    window.removeEventListener('keyup', this.handlekeyup);
  }
  firstRender(): void {
    super.firstRender();
    if (!this.hasAttribute("tabindex")) this.tabIndex = 0;
  }

  // event handlers
  private handlekeyup = (e: KeyboardEvent) => {
    if ((e.key || e.code).toLowerCase() === "enter") {
      if (this.hasFocus) {
        this.dispatchEvent(new Event('click'));
      }
    }
  }
  private handleclick = () => {
    if (this.href) {
      window.location.href = this.href;
    }
    else if (this._internals.form) {
      if (this.type === "submit") {
        this._internals.form.requestSubmit();
      }

      else if (this.type === "reset") {
        this._internals.form.reset();
      }
    }
  }

  render() {
    return `
      <pap-prefix-suffix-template part="prefix-suffix">
        <slot slot="prefix" name="prefix"></slot>
        <slot></slot>
        <slot slot="suffix" name="suffix"></slot>
      </pap-prefix-suffix-template>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pap-button": Button;
  }
}