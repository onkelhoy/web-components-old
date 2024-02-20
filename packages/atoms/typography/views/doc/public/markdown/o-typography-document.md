# Typography

Atomic Type: atoms

Version: 0.0.0

## Development

Development servers can be started and should all exist inside `"views"` folder

## Scripts

PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and register code provided to you - could you create a rather simple introduction text with maybe a code example how to use in html - keep it very simple. Do not give example how to run the register code it's already included (this is for you so you can see the element-tag)! The introduction should be read by developers so it needs not to be simple enough for beginners!

## SOURCE-CODE

// utils
import { html, property } from "@pap-it/system-utils";

// templates
import { Base } from "@pap-it/system-base";

// local
import { style } from "./style";
import { Variant, Alignment } from "./types";

export class Typography extends Base {
    static style = style;

    @property({ rerender: false }) variant: Variant = "C3";
    @property({ rerender: false }) align: Alignment = "initial";
    @property({ rerender: false, type: Boolean }) nowrap = false;

    render() {
        return html`
            <slot></slot>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "pap-typography": Typography;
    }
}

## REGISTER-CODE

import { Typography } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('pap-typography')) {
  cElements.define('pap-typography', Typography);
}
PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and the types can you give me the following tables.

1. properties (columns: name, default-value, type, description)
2. events (columns: name - ex: 'click', type - ex: CustomEvent<ClickEvent>, description - when its being triggered etc)
3.public functions (columns: name, arguments - ex: arg1:CustomType, arg2?: boolean = true, arg3?: string, description - breif explenation what it does)

## SOURCE-CODE

 // utils
import { html, property } from "@pap-it/system-utils";

// templates
import { Base } from "@pap-it/system-base";

// local
import { style } from "./style";
import { Variant, Alignment } from "./types";

export class Typography extends Base {
    static style = style;

    @property({ rerender: false }) variant: Variant = "C3";
    @property({ rerender: false }) align: Alignment = "initial";
    @property({ rerender: false, type: Boolean }) nowrap = false;

    render() {
        return html`
            <slot></slot>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "pap-typography": Typography;
    }
}

## TYPE-CODE: export type Variant = `${'C'|'T'|'H'}${1|2|3|4}`|'H5'

export type Alignment = "center" | "justify" | "start" | "end" | "left" | "right" | "unset" | "inherit" | "initial";PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and style code probided. Can you create a documentation that includes titles, short descrition and the table for each tables: css-variables, parts, slots.
css-variables should be a table with columns: (name, default-value, type - ex. CSS unit, description).
parts should include all elements that have been exposed with the part attribute ex: <p part='foo'> - and the table should then include columns: (name, description (short)).
slots should include columns: (name, default-value, description)

## SOURCE-CODE

// utils
import { html, property } from "@pap-it/system-utils";

// templates
import { Base } from "@pap-it/system-base";

// local
import { style } from "./style";
import { Variant, Alignment } from "./types";

export class Typography extends Base {
    static style = style;

    @property({ rerender: false }) variant: Variant = "C3";
    @property({ rerender: false }) align: Alignment = "initial";
    @property({ rerender: false, type: Boolean }) nowrap = false;

    render() {
        return html`
            <slot></slot>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "pap-typography": Typography;
    }
}

## STYLE-CODE

:host {
    --default-fontfamily: 'Poppins', sans-serif;
    text-align: left;
    display: block;
    color: inherit;
}

// ALIGNMENT
:host([alignment="center"]),
:host([align="center"]) {
    text-align: center;
}
:host([alignment="justify"]),
:host([align="justify"]) {
    text-align: justify;
}
:host([alignment="start"]),
:host([align="start"]) {
    text-align: start;
}
:host([alignment="end"]),
:host([align="end"]) {
    text-align: end;
}
:host([alignment="left"]),
:host([align="left"]) {
    text-align:left;
}
:host([alignment="right"]),
:host([align="right"]) {
    text-align: right;
}
:host([alignment="unset"]),
:host([align="unset"]) {
    text-align: unset;
}
:host([alignment="inherit"]),
:host([align="inherit"]) {
    text-align: inherit;
}
:host([alignment="initial"]),
:host([align="initial"]) {
    text-align: initial;
}

:host([nowrap="true"]) {
    white-space: nowrap;
}

// HEADING
:host([variant="heading1"]),
:host([variant="h1"]) {
    font-family: var(--typography-h1-fontfamily, var(--default-fontfamily, 'Libre Franklin', helvetica, sans-serif));
    font-size: var(--typography-h1-fontsize, 140px);
    font-weight: var(--typography-h1-fontweight, 800);
    line-height: var(--typography-h1-lineheight, 168px);
    letter-spacing: var(--typography-h1-letterspacing, 0em);
}
:host([variant="heading2"]),
:host([variant="h2"]) {
    font-family: var(--typography-h2-fontfamily, var(--default-fontfamily, 'Libre Franklin', helvetica, sans-serif));
    font-size: var(--typography-h2-fontsize, 88px);
    font-weight: var(--typography-h2-fontweight, 800);
    line-height: var(--typography-h2-lineheight, 106px);
    letter-spacing: var(--typography-h2-letterspacing, 0em);
}
:host([variant="heading3"]),
:host([variant="h3"]) {
    font-family: var(--typography-h3-fontfamily, var(--default-fontfamily, 'Libre Franklin', helvetica, sans-serif));
    font-size: var(--typography-h3-fontsize, 72px);
    font-weight: var(--typography-h3-fontweight, 700);
    line-height: var(--typography-h3-lineheight, 86px);
    letter-spacing: var(--typography-h3-letterspacing, 0em);
}
:host([variant="heading4"]),
:host([variant="h4"]) {
    font-family: var(--typography-h4-fontfamily, var(--default-fontfamily, 'Libre Franklin', helvetica, sans-serif));
    font-size: var(--typography-h4-fontsize, 64px);
    font-weight: var(--typography-h4-fontweight, 700);
    line-height: var(--typography-h4-lineheight, 77px);
    letter-spacing: var(--typography-h4-letterspacing, 0em);
}
:host([variant="heading5"]),
:host([variant="h5"]) {
    font-family: var(--typography-h5-fontfamily, var(--default-fontfamily, 'Libre Franklin', helvetica, sans-serif));
    font-size: var(--typography-h5-fontsize, 56px);
    font-weight: var(--typography-h5-fontweight, 700);
    line-height: var(--typography-h5-lineheight, 67px);
    letter-spacing: var(--typography-h5-letterspacing, 0em);
}

// TITLE
:host([variant="title1"]),
:host([variant="t1"]) {
    font-family: var(--typography-t1-fontfamily, var(--default-fontfamily, 'Libre Franklin', helvetica, sans-serif));
    font-size: var(--typography-t1-fontsize, 3rem);
    font-weight: var(--typography-t1-fontweight, 700);
    line-height: var(--typography-t1-lineheight, 58px);
    letter-spacing: var(--typography-t1-letterspacing, 0em);
}
:host([variant="title2"]),
:host([variant="t2"]) {
    font-family: var(--typography-t2-fontfamily, var(--default-fontfamily, 'Libre Franklin', helvetica, sans-serif));
    font-size: var(--typography-t2-fontsize, 40px);
    font-weight: var(--typography-t2-fontweight, 700);
    line-height: var(--typography-t2-lineheight, 56px);
    letter-spacing: var(--typography-t2-letterspacing, 0em);
}
:host([variant="title3"]),
:host([variant="t3"]) {
    font-family: var(--typography-t3-fontfamily, var(--default-fontfamily, 'Libre Franklin', helvetica, sans-serif));
    font-size: var(--typography-t3-fontsize, 32px);
    font-weight: var(--typography-t3-fontweight, 600);
    line-height: var(--typography-t3-lineheight, 38px);
    letter-spacing: var(--typography-t3-letterspacing, 0em);
}
:host([variant="title4"]),
:host([variant="t4"]) {
    font-family: var(--typography-t4-fontfamily, var(--default-fontfamily, 'Libre Franklin', helvetica, sans-serif));
    font-size: var(--typography-t4-fontsize, 24px);
    font-weight: var(--typography-t4-fontweight, 600);
    line-height: var(--typography-t4-lineheight, 34px);
    letter-spacing: var(--typography-t4-letterspacing, 0em);
    text-transform: uppercase;
}

// COPY
:host([variant="copy1"]),
:host([variant="c1"]) {
    font-family: var(--typography-c1-fontfamily, var(--default-fontfamily, 'Libre Franklin', helvetica, sans-serif));
    font-size: var(--typography-c1-fontsize, 24px);
    font-weight: var(--typography-c1-fontweight, 500);
    line-height: var(--typography-c1-lineheight, 34px);
    letter-spacing: var(--typography-c1-letterspacing, 0.01em);
}
:host([variant="copy2"]),
:host([variant="c2"]) {
    font-family: var(--typography-c2-fontfamily, var(--default-fontfamily, 'Libre Franklin', helvetica, sans-serif));
    font-size: var(--typography-c2-fontsize, 16px);
    font-weight: var(--typography-c2-fontweight, 600);
    line-height: var(--typography-c2-lineheight, 22px);
    letter-spacing: var(--typography-c2-letterspacing, 0.01em);
}
:host([variant="copy3"]),
:host([variant="c3"]) {
    font-family: var(--typography-c3-fontfamily, var(--default-fontfamily, 'Libre Franklin', helvetica, sans-serif));
    font-size: var(--typography-c3-fontsize, 16px);
    font-weight: var(--typography-c3-fontweight, 400);
    line-height: var(--typography-c3-lineheight, 24px);
    letter-spacing: var(--typography-c3-letterspacing, 0.01em);
}
:host([variant="copy4"]),
:host([variant="c4"]) {
    font-family: var(--typography-c4-fontfamily, var(--default-fontfamily, 'Libre Franklin', helvetica, sans-serif));
    font-size: var(--typography-c4-fontsize, 14px);
    font-weight: var(--typography-c4-fontweight, 400);
    line-height: var(--typography-c4-lineheight, 20px);
    letter-spacing: var(--typography-c4-letterspacing, 0.01em);
}
