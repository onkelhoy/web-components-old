// utils 
import { html, property } from "@henry2/tools-utils";

// atoms
import "@henry2/button/wc";
import "@henry2/icon/wc";

// templates
import { BaseTemplate } from "@henry2/templates-base";
import "@henry2/templates-box/wc";

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