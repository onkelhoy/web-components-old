import { property, Size } from '@circular-tools/utils';
import { BoxTemplate } from '@circular-templates/box';

import { style } from './style.js';

import type { ButtonMode, ButtonVariant, ButtonType } from './types';

export class Button extends BoxTemplate {
    static style = style;
    
    @property({ rerender: false }) size: Size = "medium";
    @property({ rerender: false }) mode: ButtonMode = "hug";
    @property({ rerender: false }) variant: ButtonVariant = "filled";
    @property({ rerender: false }) tabIndex: number = 1;

    // class functions
    constructor() {
        super();
        setTimeout(() => {
            if (!this.color) this.color = "black";
        }, 1);
    }
    connectedCallback(): void {
        super.connectedCallback();
        window.addEventListener('keyup', this.handlekeyup);
    }
    disconnectedCallback(): void {
        super.disconnectedCallback();
        window.removeEventListener('keyup', this.handlekeyup);
    }

    // event handlers
    private handlekeyup = (e:KeyboardEvent) => {
        if ((e.key || e.code).toLowerCase() === "enter")
        {
            if (this.hasFocus)
            {
                this.dispatchEvent(new Event('click'));
            }
        }
    }

    render() {
        return `
            <slot name="left"><span> </span></slot>
            <slot></slot>
            <slot name="right"><span> </span></slot>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "o-button": Button;
    }
}