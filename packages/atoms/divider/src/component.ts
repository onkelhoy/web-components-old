// utils 
import { html, property } from "@onkelhoy/tools-utils";

// templates
import { BaseTemplate } from "@onkelhoy/templates-base";

// local 
import { style } from "./style";
import { Mode } from "./types";

export class Divider extends BaseTemplate {
    static style = style;
    
    @property({ rerender: false }) mode: Mode = "horizontal";

    render() {
        return '<div></div>'
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "o-divider": Divider;
    }
}