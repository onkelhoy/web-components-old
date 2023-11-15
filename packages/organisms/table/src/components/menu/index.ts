// utils 
import { html, property } from "@papit/tools-utils";

// atoms
import "@papit/button/wc";
import "@papit/icon/wc";

// templates
import { BaseTemplate } from "@papit/templates-base";
import "@papit/templates-box/wc";

import { style } from "./style";

export class Menu extends BaseTemplate {
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