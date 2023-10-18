PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and style code probided. Can you create a documentation that includes titles, short descrition and the table for each tables: css-variables, parts, slots.
css-variables should be a table with columns: (name, default-value, type - ex. CSS unit, description).
parts should include all elements that have been exposed with the part attribute ex: <p part='foo'> - and the table should then include columns: (name, description (short)).
slots should include columns: (name, default-value, description)

## SOURCE-CODE:
// utils 
import { property } from "@henry2/tools-utils";

// templates
import { BaseTemplate } from "@henry2/templates-base";

export class FormElementTemplate extends BaseTemplate {

    @property({ type: Boolean, rerender: false }) disabled?: boolean;
    @property({ type: Boolean, rerender: false }) required?: boolean;
    @property({ rerender: false }) name?: string;

    protected formElement!: HTMLFormElement;

    protected findForm() {

        setTimeout(() => {
            const closestOFORM = this.shadow_closest("o-form");
            if (closestOFORM)
            {
                const form = closestOFORM.querySelector<HTMLFormElement>('form');
                if (form) this.assignForm(form);
            }
            else 
            {
                const form = this.shadow_closest<HTMLFormElement>("form");
                if (form) this.assignForm(form);
            }
        }, 100);
    }

    private assignForm(form:HTMLFormElement)
    {
        this.formElement = form;
        this.dispatchEvent(new Event("form-element-loaded"));
    }

    connectedCallback(): void {
        super.connectedCallback();

        this.findForm();
    }

    firstUpdate(): void {
        if (!this.formElement) this.findForm();
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "o-form-element-template": FormElementTemplate;
    }
}
## STYLE-CODE:
