PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and style code probided. Can you create a documentation that includes titles, short descrition and the table for each tables: css-variables, parts, slots.
css-variables should be a table with columns: (name, default-value, type - ex. CSS unit, description).
parts should include all elements that have been exposed with the part attribute ex: <p part='foo'> - and the table should then include columns: (name, description (short)).
slots should include columns: (name, default-value, description)

## SOURCE-CODE:
// utils 
import { html, property, FormatNumber } from "@pap-it/system-utils";

// atoms
import "@pap-it/typography/wc"

// templates
import { BaseSystem } from "@pap-it/system-base";
import "@pap-it/templates-box/wc"

// local 
import { style } from './style';

export class Badge extends BaseSystem {
  static style = style;

  @property({ type: Number }) count: number = 0;

  render() {
    return html`
            <pap-box-template part="box" radius="circular">
                <pap-typography variant="C4"><slot>${FormatNumber(this.count)}</slot></pap-typography>
            </pap-box-template>
        `
  }
}


declare global {
  interface HTMLElementTagNameMap {
    "pap-badge": Badge;
  }
}
## STYLE-CODE:
:host {
    pap-box-template {
        background-color: var(--pap-color-bg, #FFFFFF);
        border: 1px solid var(--pap-color-border, #C7CBD4);
        color: var(--pap-color-text, #29292F);
    
        display: inline-flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        min-width: 2rem;
        padding: var(--padding-smaller, 4px) var(--padding-small, 8px);
    }
}

:host([mode="inactive"]) {
    pap-box-template {
        background-color: var(--pap-color-bg-secondary, #F6F7F8);
        border: 1px solid var(--pap-color-border-secondary, #DADDE3);
        color: var(--pap-color-text-secondary, #6E7087);
    }
}
