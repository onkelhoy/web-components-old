PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and the types can you give me the following tables. 
1. properties (columns: name, default-value, type, description) 
2. events (columns: name - ex: 'click', type - ex: CustomEvent<ClickEvent>, description - when its being triggered etc) 
3.public functions (columns: name, arguments - ex: arg1:CustomType, arg2?: boolean = true, arg3?: string, description - breif explenation what it does)

## SOURCE-CODE:
 // utils 
import { html, property } from "@henry2/tools-utils";

// templates
import { BaseTemplate } from "@henry2/templates-base";
import { Placement } from "@henry2/templates-popover";
import "@henry2/templates-popover/wc";
import "@henry2/templates-box/wc";

// local 
import { style } from "./style";
// import { Foo, ClickEvent } from "./types";

export class Tooltip extends BaseTemplate {
    static style = style;

    @property() placement:Placement = "top-center";

    render() {
        return html`
            <o-popover-template revealby="hover" placement="${this.placement}">
                <slot slot="target" name="target"></slot>
                <o-box-template elevation="small"  part="card" radius="medium">
                    <slot></slot>
                </o-box-template>
            </o-popover-template>
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "o-tooltip": Tooltip;
    }
}

## TYPE-CODE: export {}