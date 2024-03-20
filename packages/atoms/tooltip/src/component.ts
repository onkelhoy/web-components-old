// system
import { html, property, CustomElement } from "@pap-it/system-utils";
import { Placement } from "@pap-it/templates-popover";
import "@pap-it/templates-popover/wc";
import "@pap-it/templates-box/wc";

// local 
import { style } from "./style";
// import { Foo, ClickEvent } from "./types";

export class Tooltip extends CustomElement {
  static style = style;

  @property() placement: Placement = "top-center";

  render() {
    return html`
      <pap-popover-template revealby="hover" placement="${this.placement}">
        <slot slot="target" name="target"></slot>
        <pap-box-template elevation="small"  part="card" radius="medium">
          <slot></slot>
        </pap-box-template>
      </pap-popover-template>
    `
  }
}


declare global {
  interface HTMLElementTagNameMap {
    "pap-tooltip": Tooltip;
  }
}