// utils 
import { html, property } from "@papit/tools-utils";

// templates
import { BaseTemplate } from "@papit/templates-base";

// local 
import { style } from "./style";
import { Mode } from "./types";

export class Divider extends BaseTemplate {
    static style = style;
    
    @property({ rerender: false }) mode: Mode = "horizontal";

    render() {
        return '<div part="line"></div>'
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "pap-divider": Divider;
    }
}