// utils 
import { html, property } from "@papit/tools-utils";

// templates
import { BaseTemplate } from "@papit/templates-base";
import { Placement } from "@papit/templates-popover";
import "@papit/templates-popover/wc";
import "@papit/templates-box/wc";

// local 
import { style } from "./style";
// import { Foo, ClickEvent } from "./types";

export class Tooltip extends BaseTemplate {
    static style = style;

    @property() placement:Placement = "top-center";

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