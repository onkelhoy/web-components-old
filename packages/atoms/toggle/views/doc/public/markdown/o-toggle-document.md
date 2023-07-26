# Toggle

Atomic Type: atoms

Version: 1.0.0

## Development 
Development servers can be started and should all exist inside `"views"` folder

## Scripts 
PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and register code provided to you - could you create a rather simple introduction text with maybe a code example how to use in html - keep it very simple. Do not give example how to run the register code it's already included (this is for you so you can see the element-tag)! The introduction should be read by developers so it needs not to be simple enough for beginners!

## SOURCE-CODE:
// utils 
import { html, property } from "@circular-tools/utils";

// templates
import { BaseTemplate } from "@circular-templates/base";
import { FieldTemplate } from "@circular-templates/field";
import "@circular-templates/box/wc";

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
## REGISTER-CODE:
import { Toggle } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('o-toggle')) {
  cElements.define('o-toggle', Toggle);
}
PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and the types can you give me the following tables. 
1. properties (columns: name, default-value, type, description) 
2. events (columns: name - ex: 'click', type - ex: CustomEvent<ClickEvent>, description - when its being triggered etc) 
3.public functions (columns: name, arguments - ex: arg1:CustomType, arg2?: boolean = true, arg3?: string, description - breif explenation what it does)

## SOURCE-CODE:
 // utils 
import { html, property } from "@circular-tools/utils";

// templates
import { BaseTemplate } from "@circular-templates/base";
import { FieldTemplate } from "@circular-templates/field";
import "@circular-templates/box/wc";

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

## TYPE-CODE: export {}PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and style code probided. Can you create a documentation that includes titles, short descrition and the table for each tables: css-variables, parts, slots.
css-variables should be a table with columns: (name, default-value, type - ex. CSS unit, description).
parts should include all elements that have been exposed with the part attribute ex: <p part='foo'> - and the table should then include columns: (name, description (short)).
slots should include columns: (name, default-value, description)

## SOURCE-CODE:
// utils 
import { html, property } from "@circular-tools/utils";

// templates
import { BaseTemplate } from "@circular-templates/base";
import { FieldTemplate } from "@circular-templates/field";
import "@circular-templates/box/wc";

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
        height: var(--container-size-small);
        width: calc(var(--container-size-large) - var(--unit-size2));
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
                width: var(--container-size-small);
                height: var(--container-size-small);
                border-radius: 50%;
                background-color: var(--o-color-neutral-500);
            }
        }
    }
}

:host([checked="true"]) {
    span[part="indicator"] {
        left: calc(100% - var(--container-size-small));
    }
}
:host([checked="false"]) {
    span[part="indicator"] {
        left: 0;
    }
}