// utils 
import { html, property, Size } from "@papit/tools-utils";

// templates
import { BaseTemplate } from "@papit/templates-base";
import "@papit/templates-box/wc";

import { style } from "./style";

export class Card extends BaseTemplate {
  static style = style;

  @property({ rerender: false }) padding: Size = "large";

  render() {
    return html`
      <pap-box-template part="box" radius="medium">
        <slot></slot>
      </pap-box-template>
    `
  }
}