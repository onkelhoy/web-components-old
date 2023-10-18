// utils 
import { html, property, Size } from "@pap-it/system-utils";

// templates
import { BaseSystem } from "@pap-it/system-base";
import "@pap-it/templates-box/wc";

import { style } from "./style";

export class Card extends BaseSystem {
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