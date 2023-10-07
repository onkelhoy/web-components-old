// utils 
import { html, property } from "@henry2/tools-utils";

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
  @property() infotext: string = "This is ok";

  render() {
    return html`
      <o-showcase-card>
        <slot></slot>
      </o-showcase-card>
      <div>
        ${this.variant === "success" ? html`<o-icon size="small" name="success"></o-icon>` : ''}
        ${this.variant === "warning" ? html`<o-icon size="small" name="warning"></o-icon>` : ''}
        ${this.variant === "error" ? html`<o-icon size="small" name="error"></o-icon>` : ''}

        <o-typography>${this.infotext}</o-typography>
      </div>
    `
  }
}

// types & interfaces 
export type Variant = "success"|"error"|"warning";