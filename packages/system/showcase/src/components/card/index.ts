// utils 
import { html, property, Size, CustomElement } from "@pap-it/system-utils";

// templates
import "@pap-it/templates-box";

import { style } from "./style";

export class Card extends CustomElement {
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