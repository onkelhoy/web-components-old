PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and register code provided to you - could you create a rather simple introduction text with maybe a code example how to use in html - keep it very simple. Do not give example how to run the register code it's already included (this is for you so you can see the element-tag)! The introduction should be read by developers so it needs not to be simple enough for beginners!

## SOURCE-CODE:
import { property, Size } from '@circular-tools/utils';
import { BoxTemplate } from '@circular-templates/box';

import { style } from './style.js';

import type { ButtonMode, ButtonVariant, ButtonType } from './types';

export class Button extends BoxTemplate {
    static styles = [BoxTemplate.style, style];
    
    @property() size: Size = "medium";
    @property() mode: ButtonMode = "hug";
    @property() variant: ButtonVariant = "filled";
    @property() tabIndex: number = 1;

    constructor() {
        super();

        setTimeout(() => {
            if (!this.color) this.color = "primary";
        }, 1)
    }

    render() {
        return `
            <slot name="left"><span> </span></slot>
            <slot></slot>
            <slot name="right"><span> </span></slot>
        `;
    }
}
## REGISTER-CODE:
import { Button } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('o-button')) {
  cElements.define('o-button', Button);
}
