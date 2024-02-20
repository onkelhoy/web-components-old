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
