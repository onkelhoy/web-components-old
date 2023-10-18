// utils 
import { html, property } from "@pap-it/system-utils";

// atoms
import "@pap-it/button/wc";
import "@pap-it/icon/wc";

// templates
import { BaseSystem } from "@pap-it/system-base";
import "@pap-it/templates-box/wc";

import { style } from "./style";

export class Menu extends BaseSystem {
  static style = style;

  @property({ type: Object }) config: Partial<Config> = {};

  render() {
    return html`
      <pap-popover-template hideonoutsideclick="true" placement="bottom-right" revealby="click">
        <pap-button revealby="click" slot="target">
          <pap-icon name="caret">v</pap-icon>
          <pap-icon name="filtered">v|</pap-icon>
        </pap-button>

        <pap-box-template radius="medium" elevation="medium">
          HELLO
          HELLO
          HELLO
          HELLO
          HELLO
        </pap-box-template>
      </pap-popover-template>
    `
  }
}

export type Config = {
  filters: boolean;
  search: boolean;
  sort: boolean;
}