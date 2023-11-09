PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and the types can you give me the following tables. 
1. properties (columns: name, default-value, type, description) 
2. events (columns: name - ex: 'click', type - ex: CustomEvent<ClickEvent>, description - when its being triggered etc) 
3.public functions (columns: name, arguments - ex: arg1:CustomType, arg2?: boolean = true, arg3?: string, description - breif explenation what it does)

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

## TYPE-CODE: export {}