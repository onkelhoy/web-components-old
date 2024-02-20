# Switch

Atomic Type: atoms

Version: 1.0.0

## Development

Development servers can be started and should all exist inside `"views"` folder

## Scripts

PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and register code provided to you - could you create a rather simple introduction text with maybe a code example how to use in html - keep it very simple. Do not give example how to run the register code it's already included (this is for you so you can see the element-tag)! The introduction should be read by developers so it needs not to be simple enough for beginners!

## SOURCE-CODE

// utils
import { html } from "@pap-it/system-utils";

// templates
import { Field } from "@pap-it/templates-field";
import "@pap-it/templates-box/wc";

// local
import { style } from "./style";

export class Switch extends Field {
    static style = style;

    constructor() {
        super();

        this.addEventListener("click", this.handleclick);
        this.addEventListener("keyup", this.handlekeyup);
    }
    
    // event handlers
    private handlekeyup = (e:KeyboardEvent) => {
        if ((e.key || e.code).toLowerCase() === "enter")
        {
            if (this.hasFocus)
            {
                this.value = (!this.checked).toString();
            }
        }
    }
    private handleclick = () => {
        this.value = (!this.checked).toString();
    }

    render() {
        return super.render(html`
            <input type="checkbox" hidden />
            <pap-box-template class="toggle" radius="circular">
                <div>
                    <span part="indicator"><slot></slot></span>
                </div>
            </pap-box-template>
        `);
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "pap-switch": Switch;
    }
}

## REGISTER-CODE

import { Switch } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('pap-switch')) {
  cElements.define('pap-switch', Switch);
}
PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and the types can you give me the following tables.

1. properties (columns: name, default-value, type, description)
2. events (columns: name - ex: 'click', type - ex: CustomEvent<ClickEvent>, description - when its being triggered etc)
3.public functions (columns: name, arguments - ex: arg1:CustomType, arg2?: boolean = true, arg3?: string, description - breif explenation what it does)

## SOURCE-CODE

 // utils
import { html } from "@pap-it/system-utils";

// templates
import { Field } from "@pap-it/templates-field";
import "@pap-it/templates-box/wc";

// local
import { style } from "./style";

export class Switch extends Field {
    static style = style;

    constructor() {
        super();

        this.addEventListener("click", this.handleclick);
        this.addEventListener("keyup", this.handlekeyup);
    }
    
    // event handlers
    private handlekeyup = (e:KeyboardEvent) => {
        if ((e.key || e.code).toLowerCase() === "enter")
        {
            if (this.hasFocus)
            {
                this.value = (!this.checked).toString();
            }
        }
    }
    private handleclick = () => {
        this.value = (!this.checked).toString();
    }

    render() {
        return super.render(html`
            <input type="checkbox" hidden />
            <pap-box-template class="toggle" radius="circular">
                <div>
                    <span part="indicator"><slot></slot></span>
                </div>
            </pap-box-template>
        `);
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "pap-switch": Switch;
    }
}

## TYPE-CODE: export {}

PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and style code probided. Can you create a documentation that includes titles, short descrition and the table for each tables: css-variables, parts, slots.
css-variables should be a table with columns: (name, default-value, type - ex. CSS unit, description).
parts should include all elements that have been exposed with the part attribute ex: <p part='foo'> - and the table should then include columns: (name, description (short)).
slots should include columns: (name, default-value, description)

## SOURCE-CODE

// utils
import { html } from "@pap-it/system-utils";

// templates
import { Field } from "@pap-it/templates-field";
import "@pap-it/templates-box/wc";

// local
import { style } from "./style";

export class Switch extends Field {
    static style = style;

    constructor() {
        super();

        this.addEventListener("click", this.handleclick);
        this.addEventListener("keyup", this.handlekeyup);
    }
    
    // event handlers
    private handlekeyup = (e:KeyboardEvent) => {
        if ((e.key || e.code).toLowerCase() === "enter")
        {
            if (this.hasFocus)
            {
                this.value = (!this.checked).toString();
            }
        }
    }
    private handleclick = () => {
        this.value = (!this.checked).toString();
    }

    render() {
        return super.render(html`
            <input type="checkbox" hidden />
            <pap-box-template class="toggle" radius="circular">
                <div>
                    <span part="indicator"><slot></slot></span>
                </div>
            </pap-box-template>
        `);
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "pap-switch": Switch;
    }
}

## STYLE-CODE

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
        height: auto;
        border-radius: var(--radius-max, 1000px);
        margin-left: var(--margin-small, 8px);
        // height: var(--field-size-smaller, 24px);
    }

    pap-box-template.toggle {
        content: '';
        display: inline-block;
        height: var(--field-size-smaller, 24px);
        width: calc(var(--field-size-large, 56px));
        background-color: var(--pap-color-neutral-50);
        padding: var(--padding-smaller, 4px);

        div {
            position: relative;

            span[part="indicator"] {
                position: absolute;
                transition: left ease var(--timing-fast, 80ms);
                content: '';
                display: flex;
                justify-content: center;
                align-items: center;
                width: var(--field-size-smaller, 24px);
                height: var(--field-size-smaller, 24px);
                border-radius: 50%;
                background-color: var(--pap-color-neutral-500);
            }
        }
    }
}

:host([checked="true"]) {
    span[part="indicator"] {
        left: calc(100% - var(--field-size-smaller, 24px));
    }
}
:host([checked="false"]) {
    span[part="indicator"] {
        left: 0;
    }
}
