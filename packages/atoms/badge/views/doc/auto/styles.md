PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and style code probided. Can you create a documentation that includes titles, short descrition and the table for each tables: css-variables, parts, slots.
css-variables should be a table with columns: (name, default-value, type - ex. CSS unit, description).
parts should include all elements that have been exposed with the part attribute ex: <p part='foo'> - and the table should then include columns: (name, description (short)).
slots should include columns: (name, default-value, description)

## SOURCE-CODE:
// utils 
import { html, property, FormatNumber } from "@onkelhoy/tools-utils";

// atoms
import "@onkelhoy/typography/wc"

// templates
import { BaseTemplate } from "@onkelhoy/templates-base";
import "@onkelhoy/templates-box/wc"

// local 
import { style } from './style';

export class Badge extends BaseTemplate {
    static style = style;

    @property({ type: Number}) count: number = 0;

    render() {
        return html`
            <o-box-template radius="circular">
                <o-typography variant="C4">${FormatNumber(this.count)}</o-typography>
            </o-box-template>
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "o-badge": Badge;
    }
}
## STYLE-CODE:
:host {
    --background: var(--o-color-neutral-200);
    --border: var(--o-color-neutral-300);

    o-box-template {
        background-color: var(--background);
        border: 1px solid var(--border);
        color: var(--o-color-black);
    
        width: 48px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        height: 28px;
        box-sizing: border-box;
    }
}
