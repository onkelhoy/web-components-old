// utils 
import { html } from "@pap-it/system-utils";

// templates
import { BaseSystem } from "@pap-it/system-base";

import { style } from "./style";

export class Card extends BaseSystem {
  static style = style;

  render() {
    return html`
            <slot name="header"></slot>
            <slot></slot>
        `
  }
}