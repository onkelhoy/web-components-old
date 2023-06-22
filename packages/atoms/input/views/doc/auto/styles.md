PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and style code probided. Can you create a documentation that includes titles, short descrition and the table for each tables: css-variables, parts, slots.
css-variables should be a table with columns: (name, default-value, type - ex. CSS unit, description).
parts should include all elements that have been exposed with the part attribute ex: <p part='foo'> - and the table should then include columns: (name, description (short)).
slots should include columns: (name, default-value, description)

## SOURCE-CODE:
// utils 
import { html, property } from "@circular-tools/utils";

// templates
import { TextinputTemplate } from '@circular-templates/textinput';

// local 
import { style } from "./style";
import { InputType } from './types';

export class Input extends TextinputTemplate<HTMLInputElement> {
    static style = style;

    @property() type: InputType = "text";

    render() {
        return super.render(html`
            <input @click="${this.handlekeyup}" @keyup="${this.handlekeyup}" placeholder="${this.placeholder || ""}" type="${this.type}" value="${this.value || ""}" />
        `)
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "o-input": Input;
    }
}
## STYLE-CODE:
:host {
    
}

@media (prefers-color-scheme: dark) {
    :host {
    }
}