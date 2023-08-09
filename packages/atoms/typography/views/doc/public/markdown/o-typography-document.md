# Typography

Atomic Type: atoms

Version: 1.0.0

## Development 
Development servers can be started and should all exist inside `"views"` folder

## Scripts 
PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and register code provided to you - could you create a rather simple introduction text with maybe a code example how to use in html - keep it very simple. Do not give example how to run the register code it's already included (this is for you so you can see the element-tag)! The introduction should be read by developers so it needs not to be simple enough for beginners!

## SOURCE-CODE:
// utils 
import { html, property } from "@onkelhoy/tools-utils";

// templates
import { BaseTemplate } from "@onkelhoy/templates-base";

// local 
import { style } from "./style";
import { Variant } from "./types";

export class Typography extends BaseTemplate {
    static style = style;

    @property({ rerender: false }) variant: Variant = "C3";


    render() {
        return html`
            <slot></slot>
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "o-typography": Typography;
    }
}
## REGISTER-CODE:
import { Typography } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('o-typography')) {
  cElements.define('o-typography', Typography);
}
PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and the types can you give me the following tables. 
1. properties (columns: name, default-value, type, description) 
2. events (columns: name - ex: 'click', type - ex: CustomEvent<ClickEvent>, description - when its being triggered etc) 
3.public functions (columns: name, arguments - ex: arg1:CustomType, arg2?: boolean = true, arg3?: string, description - breif explenation what it does)

## SOURCE-CODE:
 // utils 
import { html, property } from "@onkelhoy/tools-utils";

// templates
import { BaseTemplate } from "@onkelhoy/templates-base";

// local 
import { style } from "./style";
import { Variant } from "./types";

export class Typography extends BaseTemplate {
    static style = style;

    @property({ rerender: false }) variant: Variant = "C3";


    render() {
        return html`
            <slot></slot>
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "o-typography": Typography;
    }
}

## TYPE-CODE: export type Variant = `${'C'|'T'|'H'}${1|2|3|4}`|'H5';PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and style code probided. Can you create a documentation that includes titles, short descrition and the table for each tables: css-variables, parts, slots.
css-variables should be a table with columns: (name, default-value, type - ex. CSS unit, description).
parts should include all elements that have been exposed with the part attribute ex: <p part='foo'> - and the table should then include columns: (name, description (short)).
slots should include columns: (name, default-value, description)

## SOURCE-CODE:
// utils 
import { html, property } from "@onkelhoy/tools-utils";

// templates
import { BaseTemplate } from "@onkelhoy/templates-base";

// local 
import { style } from "./style";
import { Variant } from "./types";

export class Typography extends BaseTemplate {
    static style = style;

    @property({ rerender: false }) variant: Variant = "C3";


    render() {
        return html`
            <slot></slot>
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "o-typography": Typography;
    }
}
## STYLE-CODE:
:host {
    --color: var(--typography-light-text-color, var(--colors-netural-black, black));
    --default-fontfamily: 'Poppins', sans-serif;
    
    display: block;
    color: var(--color);
    font-family: var(--typography-font-family, var(--default-fontfamily));
}

@media (prefers-color-scheme: dark) {
    :host {
        --color: var(--typography-dark-text-color, var(--colors-netural-white, white));
    }
}

// HEADING
:host([variant="H1"]) {
    font-size: 140px;
    font-weight: 800;
    line-height: 168px;
    letter-spacing: 0em;
    text-align: left;
}
:host([variant="H2"]) {
    font-size: 88px;
    font-weight: 800;
    line-height: 106px;
    letter-spacing: 0em;
    text-align: left;
}
:host([variant="H3"]) {
    font-size: 72px;
    font-weight: 700;
    line-height: 86px;
    letter-spacing: 0em;
    text-align: left;
}
:host([variant="H4"]) {
    font-size: 64px;
    font-weight: 700;
    line-height: 77px;
    letter-spacing: 0em;
    text-align: left;
}
:host([variant="H5"]) {
    font-size: 56px;
    font-weight: 700;
    line-height: 67px;
    letter-spacing: 0em;
    text-align: left;
}

// TITLE
:host([variant="T1"]) {
    font-size: 48px;
    font-weight: 700;
    line-height: 58px;
    letter-spacing: 0em;
    text-align: left;
}
:host([variant="T2"]) {
    font-size: 40px;
    font-weight: 700;
    line-height: 56px;
    letter-spacing: 0em;
    text-align: left;
}
:host([variant="T3"]) {
    font-size: 32px;
    font-weight: 600;
    line-height: 38px;
    letter-spacing: 0em;
    text-align: left;
}
:host([variant="T4"]) {
    font-size: 24px;
    font-weight: 600;
    line-height: 34px;
    letter-spacing: 0em;
    text-align: left;
    text-transform: uppercase;
}

// COPY
:host([variant="C1"]) {
    font-size: 24px;
    font-weight: 500;
    line-height: 34px;
    letter-spacing: 0.01em;
    text-align: left;
}
:host([variant="C2"]) {
    font-size: 16px;
    font-weight: 600;
    line-height: 22px;
    letter-spacing: 0.01em;
    text-align: left;
}
:host([variant="C3"]) {
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0.01em;
    text-align: left;
}
:host([variant="C4"]) {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0.01em;
    text-align: left;    
}