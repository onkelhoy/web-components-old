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