// utils 
import { html, property } from "@papit/tools-utils";

// templates
import { BaseTemplate } from "@papit/templates-base";

// local 
import { style } from "./style";
import { Variant, Alignment } from "./types";

export class Typography extends BaseTemplate {
    static style = style;

    @property({ rerender: false }) variant: Variant = "C3";
    @property({ rerender: false }) align: Alignment = "initial";
    @property({ rerender: false, type: Boolean }) nowrap:boolean = false;
    @property({ rerender: false, type: Boolean }) truncate:boolean = false;

    render() {
        return html`
            <slot></slot>
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "pap-typography": Typography;
    }
}