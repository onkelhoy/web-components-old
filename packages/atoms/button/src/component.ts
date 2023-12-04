// system
import { property, Size } from '@pap-it/system-utils';

// templates
import { BoxTemplate } from '@pap-it/templates-box';
import "@pap-it/templates-prefix-suffix/wc";

import { style } from './style.js';

import type { ButtonMode, ButtonVariant, ButtonColorVariant, ButtonTextType } from './types';

// TODO extend form-element-template
export class Button extends BoxTemplate {
  static style = style;

  @property({ rerender: false, onUpdate: "ontypeupdate" }) type: "button" | "submit" | "reset" = "button";
  @property({ rerender: false }) size: Size = "medium";
  @property({ rerender: false }) href?: string;
  @property({ rerender: false, type: Boolean }) circle: boolean = false;
  @property({ rerender: false, type: Boolean }) loading: boolean = false;
  @property({ rerender: false }) textvariant: ButtonTextType = "B1"; // TODO attribute: 'text-variant'
  @property({ rerender: false }) mode: ButtonMode = "hug";
  @property({ rerender: false }) variant: ButtonVariant = "filled";
  @property({ rerender: false, type: Number }) tabIndex: number = 1;
  @property({ rerender: false }) color: ButtonColorVariant = "primary";

  private formelement?: HTMLFormElement;

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

  // handle update
  private ontypeupdate = () => {
    if (!["submit", "reset"].includes(this.type)) this.formelement = undefined;
    else {
      setTimeout(() => {
        // form in case of initial and not dynamic (most cases) needs to load ?
        if (!this.formelement) {
          this.formelement = this.shadow_closest<HTMLFormElement>("form");
        }
      }, 100);
    }
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
    else if (this.formelement) {
      if (this.type === "submit") {
        this.formelement.requestSubmit();
      }

      else if (this.type === "reset") {
        this.formelement.reset();
      }
    }
  }

  render() {
    return `
      <pap-prefix-suffix-template>
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