// utils 
import { html, property, Size } from "@henry2/tools-utils";

// templates
import { BaseTemplate } from "@henry2/templates-base";
import "@henry2/templates-box/wc";

import { style } from "./style";

export class Card extends BaseTemplate {
  static style = style;

  @property({ rerender: false }) padding: Size = "large";

  render() {
    return html`
      <o-box-template part="box" radius="medium">
        <slot></slot>
      </o-box-template>
    `
  }
}