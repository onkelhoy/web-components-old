PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and the types can you give me the following tables. 
1. properties (columns: name, default-value, type, description) 
2. events (columns: name - ex: 'click', type - ex: CustomEvent<ClickEvent>, description - when its being triggered etc) 
3.public functions (columns: name, arguments - ex: arg1:CustomType, arg2?: boolean = true, arg3?: string, description - breif explenation what it does)

## SOURCE-CODE:
 import { property, Size } from '@papit/tools-utils';
import { BoxTemplate } from '@papit/templates-box';

import { style } from './style.js';

import type { ButtonMode, ButtonVariant, ButtonColorVariant } from './types';

// TODO extend form-element-template
export class Button extends BoxTemplate {
    static style = style;
    
    @property({ rerender: false, onUpdate: "ontypeupdate" }) type: "button" | "link" | "submit" | "reset" = "button"; // TODO link
    @property({ rerender: false }) size: Size = "medium";
    @property({ rerender: false }) mode: ButtonMode = "hug";
    @property({ rerender: false }) variant: ButtonVariant = "filled";
    @property({ rerender: false, type: Number }) tabIndex: number = 1;
    @property({ rerender: false }) color: ButtonColorVariant = "secondary";

    private formelement?: HTMLFormElement;

    connectedCallback(): void {
        super.connectedCallback();
        this.addEventListener("click", this.handleclick, true);

        window.addEventListener('keyup', this.handlekeyup);
        // NOTE should this be a standard?
        this.role = "button";
    }
    disconnectedCallback(): void {
        super.disconnectedCallback();
        window.removeEventListener('keyup', this.handlekeyup);
    }

    // handle update
    private ontypeupdate = () => {
        if (!["submit", "reset"].includes(this.type)) this.formelement = undefined;
        else 
        {
            setTimeout(() => {
                // form in case of initial and not dynamic (most cases) needs to load ?
                if (!this.formelement) {
                    this.formelement = this.shadow_closest<HTMLFormElement>("form");
                }
            }, 100);
        }
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
    private handleclick = (e:Event) => {
        if (this.formelement) 
        {
            if (this.type === "submit")
            {
                this.formelement.requestSubmit();
            }

            else if (this.type === "reset")
            {
                this.formelement.reset();
            }
        }
    }

    render() {
        return `
            <slot name="prefix"><span> </span></slot>
            <slot></slot>
            <slot name="suffix"><span> </span></slot>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "pap-button": Button;
    }
}

## TYPE-CODE: 
export type ButtonVariant = 'filled'|'outlined'|'underlined'|'clear';
export type ButtonType = 'button' | 'reset' | 'submit';
export type ButtonMode = 'hug' | 'fill'
export type ButtonColorVariant = "primary"|"secondary"|"brand"|"danger"|"success"|"warning";