// utils 
import { html, property, Size } from "@henry2/tools-utils";

// atoms 
import "@henry2/typography/wc";
import "@henry2/icon/wc";

// templates
import { BaseTemplate } from "@henry2/templates-base";
import "@henry2/templates-box/wc";

import { style } from "./style";

export class Guideline extends BaseTemplate {
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
        ${this.variant === "success" ? html`<o-icon size="small" name="success"></o-icon>` : ''}
        ${this.variant === "warning" ? html`<o-icon size="small" name="warning"></o-icon>` : ''}
        ${this.variant === "error" ? html`<o-icon size="small" name="close"></o-icon>` : ''}

        <o-typography>${this.text}</o-typography>
      </div>
    `
  }
}

// types & interfaces 
export type Variant = "success"|"error"|"warning";