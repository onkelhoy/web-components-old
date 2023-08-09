// utils 
import { html, property } from "@onkelhoy/tools-utils";

// templates
import { BaseTemplate } from "@onkelhoy/templates-base";
import { Placement } from "@onkelhoy/templates-popover";
import "@onkelhoy/templates-popover/wc";
import "@onkelhoy/templates-box/wc";

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