# Badge

Atomic Type: atoms

Version: 1.0.0

## Development 
Development servers can be started and should all exist inside `"views"` folder

## Scripts 
PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and register code provided to you - could you create a rather simple introduction text with maybe a code example how to use in html - keep it very simple. Do not give example how to run the register code it's already included (this is for you so you can see the element-tag)! The introduction should be read by developers so it needs not to be simple enough for beginners!

## SOURCE-CODE:
// utils 
import { html, property, FormatNumber } from "@henry2/tools-utils";

// atoms
import "@henry2/typography/wc"

// templates
import { BaseTemplate } from "@henry2/templates-base";
import "@henry2/templates-box/wc"

// local 
import { style } from './style';

export class Badge extends BaseTemplate {
    static style = style;

    @property({ type: Number}) count: number = 0;

    render() {
        return html`
            <o-box-template radius="circular">
                <o-typography variant="C4">${FormatNumber(this.count)}</o-typography>
            </o-box-template>
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "o-badge": Badge;
    }
}
## REGISTER-CODE:
import { Badge } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('o-badge')) {
  cElements.define('o-badge', Badge);
}
PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and the types can you give me the following tables. 
1. properties (columns: name, default-value, type, description) 
2. events (columns: name - ex: 'click', type - ex: CustomEvent<ClickEvent>, description - when its being triggered etc) 
3.public functions (columns: name, arguments - ex: arg1:CustomType, arg2?: boolean = true, arg3?: string, description - breif explenation what it does)

## SOURCE-CODE:
 // utils 
import { html, property, FormatNumber } from "@henry2/tools-utils";

// atoms
import "@henry2/typography/wc"

// templates
import { BaseTemplate } from "@henry2/templates-base";
import "@henry2/templates-box/wc"

// local 
import { style } from './style';

export class Badge extends BaseTemplate {
    static style = style;

    @property({ type: Number}) count: number = 0;

    render() {
        return html`
            <o-box-template radius="circular">
                <o-typography variant="C4">${FormatNumber(this.count)}</o-typography>
            </o-box-template>
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "o-badge": Badge;
    }
}

## TYPE-CODE: // NOTE these are just for example purposes
type FooType1 = "bar";
type FooType2 = "hello world";

export type Foo = FooType1 | FooType2;
export type ClickEvent = { foo: Foo };PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and style code probided. Can you create a documentation that includes titles, short descrition and the table for each tables: css-variables, parts, slots.
css-variables should be a table with columns: (name, default-value, type - ex. CSS unit, description).
parts should include all elements that have been exposed with the part attribute ex: <p part='foo'> - and the table should then include columns: (name, description (short)).
slots should include columns: (name, default-value, description)

## SOURCE-CODE:
// utils 
import { html, property, FormatNumber } from "@henry2/tools-utils";

// atoms
import "@henry2/typography/wc"

// templates
import { BaseTemplate } from "@henry2/templates-base";
import "@henry2/templates-box/wc"

// local 
import { style } from './style';

export class Badge extends BaseTemplate {
    static style = style;

    @property({ type: Number}) count: number = 0;

    render() {
        return html`
            <o-box-template radius="circular">
                <o-typography variant="C4">${FormatNumber(this.count)}</o-typography>
            </o-box-template>
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "o-badge": Badge;
    }
}
## STYLE-CODE:
:host {
    --background: var(--o-color-neutral-200);
    --border: var(--o-color-neutral-300);

    o-box-template {
        background-color: var(--background);
        border: 1px solid var(--border);
        color: var(--o-color-black);
    
        width: 48px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        height: 28px;
        box-sizing: border-box;
    }
}
