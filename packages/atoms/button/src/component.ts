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