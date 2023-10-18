PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and style code probided. Can you create a documentation that includes titles, short descrition and the table for each tables: css-variables, parts, slots.
css-variables should be a table with columns: (name, default-value, type - ex. CSS unit, description).
parts should include all elements that have been exposed with the part attribute ex: <p part='foo'> - and the table should then include columns: (name, description (short)).
slots should include columns: (name, default-value, description)

## SOURCE-CODE:
// utils 
import { html, property } from "@henry2/tools-utils";

// templates
import { BaseTemplate } from "@henry2/templates-base";

// local 
import { style } from "./style";

export class Accordion extends BaseTemplate {
    static style = style;

    @property({ rerender: false, type: Boolean }) open = false;

    render() {
        return html`
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
## STYLE-CODE:
:host {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows var(--accordion-easing, cubic-bezier(1, 0, 0, 1)) var(--accordion-duration, 200ms);
    overflow: hidden;

    div[part="group"] {
        overflow: hidden;
    }
}

:host([open="true"]) {
    grid-template-rows: 1fr;
}