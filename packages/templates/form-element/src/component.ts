// utils 
import { html, property } from "@onkelhoy/tools-utils";

// templates
import { BaseTemplate } from "@onkelhoy/templates-base";

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