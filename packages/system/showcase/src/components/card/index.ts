// utils 
import { html, property, Size } from "@pap-it/system-utils";

// templates
import { Base } from "@pap-it/system-base";
import "@pap-it/templates-box/wc";

import { style } from "./style";

export class Card extends Base {
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