// utils 
import { html } from "@henry2/tools-utils";

// templates
import { BaseTemplate } from "@henry2/templates-base";

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