PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and register code provided to you - could you create a rather simple introduction text with maybe a code example how to use in html - keep it very simple. Do not give example how to run the register code it's already included (this is for you so you can see the element-tag)! The introduction should be read by developers so it needs not to be simple enough for beginners!

## SOURCE-CODE:
// utils 
import { html, property } from "@pap-it/system-utils";

// templates
import { BaseSystem } from "@pap-it/system-base";
import { Placement } from "@pap-it/templates-popover";
import "@pap-it/templates-popover/wc";
import "@pap-it/templates-box/wc";

// local 
import { style } from "./style";
// import { Foo, ClickEvent } from "./types";

export class Tooltip extends BaseSystem {
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
## REGISTER-CODE:
import { Tooltip } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('pap-tooltip')) {
  cElements.define('pap-tooltip', Tooltip);
}
