// utils 
import { html } from "@pap-it/system-utils";

// templates
import { Base } from "@pap-it/system-base";

import { style } from "./style";

export class Card extends Base {
  static style = style;

  render() {
    return html`
            <slot name="header"></slot>
            <slot></slot>
        `
  }
}