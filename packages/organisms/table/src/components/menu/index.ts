// utils 
import { html, property } from "@onkelhoy/tools-utils";

// atoms
import "@onkelhoy/button/wc";
import "@onkelhoy/icon/wc";

// templates
import { BaseTemplate } from "@onkelhoy/templates-base";
import "@onkelhoy/templates-box/wc";

import { style } from "./style";

export class Menu extends BaseTemplate {
  static style = style;

  @property({ type: Object }) config: Partial<Config> = {};

  render() {
    return html`
      <o-popover-template hideonoutsideclick="true" placement="bottom-right" revealby="click">
        <o-button revealby="click" slot="target">
          <o-icon name="caret">v</o-icon>
          <o-icon name="filtered">v|</o-icon>
        </o-button>

        <o-box-template radius="medium" elevation="medium">
          HELLO
          HELLO
          HELLO
          HELLO
          HELLO
        </o-box-template>
      </o-popover-template>
    `
  }
}

export type Config = {
  filters: boolean;
  search: boolean;
  sort: boolean;
}