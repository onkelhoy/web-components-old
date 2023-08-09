// utils 
import { html, property } from "@henry2/tools-utils";

// templates
import { BaseTemplate } from "@henry2/templates-base";

// local 
import { style } from "./style";
import { Variant, Alignment } from "./types";

export class Typography extends BaseTemplate {
    static style = style;

    @property({ rerender: false }) variant: Variant = "C3";
    @property({ rerender: false }) align: Alignment = "initial";
    @property({ rerender: false, type: Boolean }) nowrap = false;

    render() {
        return html`
            <slot></slot>
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "o-typography": Typography;
    }
}