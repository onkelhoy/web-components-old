// utils 
import { html } from "@circular-tools/utils";

// templates
import { BaseTemplate } from "@circular-templates/base";

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