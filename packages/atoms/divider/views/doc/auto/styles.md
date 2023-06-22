PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and style code probided. Can you create a documentation that includes titles, short descrition and the table for each tables: css-variables, parts, slots.
css-variables should be a table with columns: (name, default-value, type - ex. CSS unit, description).
parts should include all elements that have been exposed with the part attribute ex: <p part='foo'> - and the table should then include columns: (name, description (short)).
slots should include columns: (name, default-value, description)

## SOURCE-CODE:
// utils 
import { html, property } from "@circular-tools/utils";

// templates
import { BaseTemplate } from "@circular-templates/base";

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
## STYLE-CODE:
:host {
    --color: var(--divider-light-color, var(--colors-netural-grey300, #F1F1F4));

    div {
        background-color: var(--color);
        content: '';
    }
}
@media (prefers-color-scheme: dark) {
    :host {
        --color: var(--divider-dark-color, var(--colors-netural-grey700, #101010));
    }
}

:host([mode="horizontal"]) {
    display: flex;
    align-items: center;
    height: 16px;
    
    div {
        height: 1px;
        flex-grow: 1;
        transform: translateY(0.5px);
    }
}
:host([mode="vertical"]) {
    margin-inline: var(--divider-margin, 8px);
    height: 100%;
    div {
        width: '1px';
        height: 100%;
    }
}
