// utils 
import { html } from "@onkelhoy/tools-utils";

// templates
import { BaseTemplate } from "@onkelhoy/templates-base";

import { style } from "./style";

export class Card extends BaseTemplate {
    static style = style;

    render() {
        return html`
            <slot name="header"></slot>
            <slot></slot>
        `
    }
}