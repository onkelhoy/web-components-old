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
import { FieldTemplate } from "@onkelhoy/templates-field";
import "@onkelhoy/templates-box/wc";

// local 
import { style } from "./style";

export class Toggle extends FieldTemplate {
    static style = style;

    constructor() {
        super();

        this.addEventListener("click", this.handleclick);
        this.addEventListener("keyup", this.handlekeyup);
    }
    
    // event handlers
    private handlekeyup = (e:Event) => {
        if (this.hasFocus) 
        {
            console.log('activate')
        }
    }
    private handleclick = () => {
        this.value = (!this.checked).toString();
    }

    render() {
        return super.render(html`
            <input type="checkbox" hidden />
            <o-box-template class="toggle" radius="circular">
                <div>
                    <span part="indicator"><slot></slot></span>
                </div>
            </o-box-template>
        `);
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "o-toggle": Toggle;
    }
}
## STYLE-CODE:
:host {
    cursor: pointer;
    display: inline-flex;
    align-items: center;

    input {
        display: none !important;
    }

    &::part(wrapper) {
        border: none;
        padding: 0;
        gap: 0;
        border-radius: var(--radius-max);
        margin-left: var(--margin-small);
    }

    o-box-template.toggle {
        content: '';
        display: inline-block;
        height: var(--field-size-small);
        width: calc(var(--field-size-large) - var(--unit-size2));
        background-color: var(--o-color-white);
        padding: var(--padding-smaller);

        div {
            position: relative;

            span[part="indicator"] {
                position: absolute;
                transition: left ease var(--timing-fast);
                content: '';
                display: flex;
                justify-content: center;
                align-items: center;
                width: var(--field-size-small);
                height: var(--field-size-small);
                border-radius: 50%;
                background-color: var(--o-color-neutral-500);
            }
        }
    }
}

:host([checked="true"]) {
    span[part="indicator"] {
        left: calc(100% - var(--field-size-small));
    }
}
:host([checked="false"]) {
    span[part="indicator"] {
        left: 0;
    }
}