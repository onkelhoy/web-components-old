// utils 
import { property } from "@henry2/tools-utils";

// templates
import { BaseTemplate } from "@henry2/templates-base";

// local 
import { style } from "./style";
import { Mode } from "./types";

export class Accordion extends BaseTemplate {
    static style = style;

    @property({ rerender: false, type: Boolean }) open:boolean = false;
    @property({ rerender: false }) mode:Mode = "vertical";

    render() {
        return `
            <div part="group">
                <slot></slot>
            </div>
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "o-accordion": Accordion;
    }
}