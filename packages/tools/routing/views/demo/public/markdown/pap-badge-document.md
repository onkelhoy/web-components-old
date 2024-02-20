# Badge

Atomic Type: atoms

Version: 1.0.0

## Development

Development servers can be started and should all exist inside `"views"` folder

## Scripts

PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and register code provided to you - could you create a rather simple introduction text with maybe a code example how to use in html - keep it very simple. Do not give example how to run the register code it's already included (this is for you so you can see the element-tag)! The introduction should be read by developers so it needs not to be simple enough for beginners!

## SOURCE-CODE

// utils
import { html, property, FormatNumber } from "@pap-it/system-utils";

// atoms
import "@pap-it/typography/wc"

// templates
import { Base } from "@pap-it/system-base";
import "@pap-it/templates-box/wc"

// local
import { style } from './style';

export class Badge extends Base {
  static style = style;

  @property({ type: Number }) count: number = 0;

  render() {
    return html`
            <pap-box-template part="box" radius="circular">
                <pap-typography variant="C4"><slot>${FormatNumber(this.count)}</slot></pap-typography>
            </pap-box-template>
        `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pap-badge": Badge;
  }
}

## REGISTER-CODE

import { Badge } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('pap-badge')) {
  cElements.define('pap-badge', Badge);
}
PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and the types can you give me the following tables.

1. properties (columns: name, default-value, type, description)
2. events (columns: name - ex: 'click', type - ex: CustomEvent<ClickEvent>, description - when its being triggered etc)
3.public functions (columns: name, arguments - ex: arg1:CustomType, arg2?: boolean = true, arg3?: string, description - breif explenation what it does)

## SOURCE-CODE

 // utils
import { html, property, FormatNumber } from "@pap-it/system-utils";

// atoms
import "@pap-it/typography/wc"

// templates
import { Base } from "@pap-it/system-base";
import "@pap-it/templates-box/wc"

// local
import { style } from './style';

export class Badge extends Base {
  static style = style;

  @property({ type: Number }) count: number = 0;

  render() {
    return html`
            <pap-box-template part="box" radius="circular">
                <pap-typography variant="C4"><slot>${FormatNumber(this.count)}</slot></pap-typography>
            </pap-box-template>
        `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pap-badge": Badge;
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

## SOURCE-CODE

// utils
import { html, property, FormatNumber } from "@pap-it/system-utils";

// atoms
import "@pap-it/typography/wc"

// templates
import { Base } from "@pap-it/system-base";
import "@pap-it/templates-box/wc"

// local
import { style } from './style';

export class Badge extends Base {
  static style = style;

  @property({ type: Number }) count: number = 0;

  render() {
    return html`
            <pap-box-template part="box" radius="circular">
                <pap-typography variant="C4"><slot>${FormatNumber(this.count)}</slot></pap-typography>
            </pap-box-template>
        `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pap-badge": Badge;
  }
}

## STYLE-CODE

:host {
    pap-box-template {
        background-color: var(--pap-color-bg, #FFFFFF);
        border: 1px solid var(--pap-color-border, #C7CBD4);
        color: var(--pap-color-text, #29292F);

        display: inline-flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        min-width: 2rem;
        padding: var(--padding-smaller, 4px) var(--padding-small, 8px);
    }
}

:host([mode="inactive"]) {
    pap-box-template {
        background-color: var(--pap-color-bg-secondary, #F6F7F8);
        border: 1px solid var(--pap-color-border-secondary, #DADDE3);
        color: var(--pap-color-text-secondary, #6E7087);
    }
}
