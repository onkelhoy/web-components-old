// utils 
import { html, property, Size, Radius, query } from "@pap-it/system-utils";

// atoms
import { ButtonColorVariant, ButtonVariant } from "@pap-it/button";
import "@pap-it/icon";
import "@pap-it/button";

// templates
import { MenuTemplate } from "@pap-it/templates-menu";
import "@pap-it/templates-menu";

// local 
import { style } from "./style";

export class Menu extends MenuTemplate {
  static style = style;

  @property() buttonVariant: ButtonVariant = "clear";
  @property() buttonColor: ButtonColorVariant = "secondary";
  @property() buttonRadius: Radius = "medium";

  connectedCallback() {
    super.connectedCallback();

    this.multiple = false;
  }

  public get value() {
    return this.lastselected;
  }
  public set value(value: string | undefined) {
    this.select(value);
  }

  render() {
    return super.render(html`
      <pap-button 
        variant="${this.buttonVariant}" 
        color="${this.buttonColor}" 
        radius="${this.buttonRadius}" 
        part="button"
        slot="button"
        size="${this.size}"
      >
        <slot name="button-prefix" slot="prefix"></slot>
        <slot name="button-content"></slot>
        <slot name="button-suffix" slot="suffix">
          <pap-icon size="small" cache="true" name="caret">v</pap-icon>
        </slot>
      </pap-button>
    `)
  }
}


declare global {
  interface HTMLElementTagNameMap {
    "pap-menu": Menu;
  }
}