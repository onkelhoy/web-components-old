PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and the types can you give me the following tables. 
1. properties (columns: name, default-value, type, description) 
2. events (columns: name - ex: 'click', type - ex: CustomEvent<ClickEvent>, description - when its being triggered etc) 
3.public functions (columns: name, arguments - ex: arg1:CustomType, arg2?: boolean = true, arg3?: string, description - breif explenation what it does)

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

## TYPE-CODE: 
export type ButtonVariant = 'filled'|'outlined'|'underlined'|'clear';
export type ButtonType = 'button' | 'reset' | 'submit';
export type ButtonMode = 'hug' | 'fill'