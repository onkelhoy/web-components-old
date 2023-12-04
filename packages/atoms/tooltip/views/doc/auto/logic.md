PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and the types can you give me the following tables.

1. properties (columns: name, default-value, type, description)
2. events (columns: name - ex: 'click', type - ex: CustomEvent<ClickEvent>, description - when its being triggered etc)
3.public functions (columns: name, arguments - ex: arg1:CustomType, arg2?: boolean = true, arg3?: string, description - breif explenation what it does)

## SOURCE-CODE

 // system
import { html, property } from "@pap-it/system-utils";
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

## TYPE-CODE: export {}
