# Form-elementTemplate

Atomic Type: templates

Version: 0.0.0

## Development

Development servers can be started and should all exist inside `"views"` folder

## Scripts

PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and register code provided to you - could you create a rather simple introduction text with maybe a code example how to use in html - keep it very simple. Do not give example how to run the register code it's already included (this is for you so you can see the element-tag)! The introduction should be read by developers so it needs not to be simple enough for beginners!

## SOURCE-CODE

// utils
import { property } from "@pap-it/system-utils";

// templates
import { BaseSystem } from "@pap-it/system-base";

export class FormElementTemplate extends BaseSystem {

    @property({ type: Boolean, rerender: false }) disabled?: boolean;
    @property({ type: Boolean, rerender: false }) required?: boolean;
    @property({ rerender: false }) name?: string;

    protected formElement!: HTMLFormElement;

    protected findForm() {

        setTimeout(() => {
            const closestOFORM = this.shadow_closest("pap-form");
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
        "pap-form-element-template": FormElementTemplate;
    }
}

## REGISTER-CODE

import { FormElementTemplate } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('pap-form-element-template')) {
  cElements.define('pap-form-element-template', FormElementTemplate);
}
PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and the types can you give me the following tables.

1. properties (columns: name, default-value, type, description)
2. events (columns: name - ex: 'click', type - ex: CustomEvent<ClickEvent>, description - when its being triggered etc)
3.public functions (columns: name, arguments - ex: arg1:CustomType, arg2?: boolean = true, arg3?: string, description - breif explenation what it does)

## SOURCE-CODE

 // utils
import { property } from "@pap-it/system-utils";

// templates
import { BaseSystem } from "@pap-it/system-base";

export class FormElementTemplate extends BaseSystem {

    @property({ type: Boolean, rerender: false }) disabled?: boolean;
    @property({ type: Boolean, rerender: false }) required?: boolean;
    @property({ rerender: false }) name?: string;

    protected formElement!: HTMLFormElement;

    protected findForm() {

        setTimeout(() => {
            const closestOFORM = this.shadow_closest("pap-form");
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
        "pap-form-element-template": FormElementTemplate;
    }
}

## TYPE-CODE: export {}PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is

 Based on the source code and style code probided. Can you create a documentation that includes titles, short descrition and the table for each tables: css-variables, parts, slots.
css-variables should be a table with columns: (name, default-value, type - ex. CSS unit, description).
parts should include all elements that have been exposed with the part attribute ex: <p part='foo'> - and the table should then include columns: (name, description (short)).
slots should include columns: (name, default-value, description)

## SOURCE-CODE

// utils
import { property } from "@pap-it/system-utils";

// templates
import { BaseSystem } from "@pap-it/system-base";

export class FormElementTemplate extends BaseSystem {

    @property({ type: Boolean, rerender: false }) disabled?: boolean;
    @property({ type: Boolean, rerender: false }) required?: boolean;
    @property({ rerender: false }) name?: string;

    protected formElement!: HTMLFormElement;

    protected findForm() {

        setTimeout(() => {
            const closestOFORM = this.shadow_closest("pap-form");
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
        "pap-form-element-template": FormElementTemplate;
    }
}

## STYLE-CODE
