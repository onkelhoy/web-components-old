// utils 
import { html, property, Size, CustomElement } from "@pap-it/system-utils";

// atoms 
import "@pap-it/typography";
import "@pap-it/icon";

// templates
import "@pap-it/templates-box";

import { style } from "./style";

export class Guideline extends CustomElement {
  static style = style;

  @property() variant: Variant = "success";
  @property() padding: Size = "large";
  @property() text: string = "This is ok";

  render() {
    return html`
      <showcase-card padding="${this.padding}">
        <slot></slot>
      </showcase-card>
      <div>
        ${this.variant === "success" ? html`<pap-icon size="small" name="success"></pap-icon>` : ''}
        ${this.variant === "warning" ? html`<pap-icon size="small" name="warning"></pap-icon>` : ''}
        ${this.variant === "error" ? html`<pap-icon size="small" name="close"></pap-icon>` : ''}

        <pap-typography>${this.text}</pap-typography>
      </div>
    `
  }
}

// types & interfaces 
export type Variant = "success" | "error" | "warning";