PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and style code probided. Can you create a documentation that includes titles, short descrition and the table for each tables: css-variables, parts, slots.
css-variables should be a table with columns: (name, default-value, type - ex. CSS unit, description).
parts should include all elements that have been exposed with the part attribute ex: <p part='foo'> - and the table should then include columns: (name, description (short)).
slots should include columns: (name, default-value, description)

## SOURCE-CODE:
// utils 
import { html, property } from "@onkelhoy/tools-utils";

// templates
import { BaseTemplate } from "@onkelhoy/templates-base";

// local 
import { style } from "./style";

export class Table extends BaseTemplate {
    static style = style;

    render() {
        return html`
            <table>
                <thead>
                    
                </thead>
                <tbody>

                </tbody>
            </table>
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "o-table": Table;
    }
}
## STYLE-CODE:
:host {
    display: block;
    padding: 1rem;
    --background: var(--table-light-background-color, var(--colors-netural-white, white));
    --color: var(--table-light-text-color, var(--colors-netural-black, black));

    background-color: var(--background);
    color: var(--color);
}

@media (prefers-color-scheme: dark) {
    :host {
        --background: var(--table-dark-background-color, var(--colors-netural-black, black));
        --color: var(--table-dark-text-color, var(--colors-netural-white, white));
    }
}