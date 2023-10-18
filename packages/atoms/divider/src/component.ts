// utils 
import { html, property } from "@henry2/tools-utils";

// templates
import { BaseTemplate } from "@henry2/templates-base";

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
        "o-divider": Divider;
    }
}