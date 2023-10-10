// utils 
import { html } from "@henry2/tools-utils";

// templates
import { BaseTemplate } from "@henry2/templates-base";
import "@henry2/templates-box/wc";

import { style } from "./style";

export class Card extends BaseTemplate {
  static style = style;

  render() {
    return html`
      <o-box-template radius="medium">
        <slot></slot>
      </o-box-template>
    `
  }
}