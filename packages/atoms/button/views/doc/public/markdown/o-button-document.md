# Button

Atomic Type: atoms

Version: 1.0.0

## Development 
Development servers can be started and should all exist inside `"views"` folder

## Scripts 
PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and register code provided to you - could you create a rather simple introduction text with maybe a code example how to use in html - keep it very simple. Do not give example how to run the register code it's already included (this is for you so you can see the element-tag)! The introduction should be read by developers so it needs not to be simple enough for beginners!

## SOURCE-CODE:
import { property, Size } from '@henry2/tools-utils';
import { BoxTemplate } from '@henry2/templates-box';

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
        "o-button": Button;
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
PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and the types can you give me the following tables. 
1. properties (columns: name, default-value, type, description) 
2. events (columns: name - ex: 'click', type - ex: CustomEvent<ClickEvent>, description - when its being triggered etc) 
3.public functions (columns: name, arguments - ex: arg1:CustomType, arg2?: boolean = true, arg3?: string, description - breif explenation what it does)

## SOURCE-CODE:
 import { property, Size } from '@henry2/tools-utils';
import { BoxTemplate } from '@henry2/templates-box';

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
        "o-button": Button;
    }
}

## TYPE-CODE: 
export type ButtonVariant = 'filled'|'outlined'|'underlined'|'clear';
export type ButtonType = 'button' | 'reset' | 'submit';
export type ButtonMode = 'hug' | 'fill'
export type ButtonColorVariant = "primary"|"secondary"|"brand"|"danger"|"success"|"warning";PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and style code probided. Can you create a documentation that includes titles, short descrition and the table for each tables: css-variables, parts, slots.
css-variables should be a table with columns: (name, default-value, type - ex. CSS unit, description).
parts should include all elements that have been exposed with the part attribute ex: <p part='foo'> - and the table should then include columns: (name, description (short)).
slots should include columns: (name, default-value, description)

## SOURCE-CODE:
import { property, Size } from '@henry2/tools-utils';
import { BoxTemplate } from '@henry2/templates-box';

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
        "o-button": Button;
    }
}
## STYLE-CODE:
// value maps
$size-map: (
  small: (
    height: var(--field-size-small),
    padding: 0.5rem,
    border-width: 1px,
  ),
  medium: (
    height: var(--field-size-medium),
    padding: 1rem,
    border-width: 1px,
  ),
  large: (
    height: var(--field-size-large),
    padding: 1rem,
    border-width: 1px,
  ),
);

:host {
    cursor: var(--button-cursor, pointer);
    align-items: center;
    font-family: var(--button-font-family, var(--font-family, inherit));

    justify-content: space-between;
    gap: 0.5rem;

    box-sizing: border-box;
    position: relative;

    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */

    background-color: var(--background);
    color: var(--color);
}

:host([mode="hug"]) {
    display: inline-flex;
}
:host([mode="fill"]) {
    display: flex;
}

@each $name, $value in $size-map {
    :host([size="#{$name}"]) {
        height: var(--button-height-#{$name}, var(--height-#{$name}, #{map-get($value, height)}));
        padding: var(--button-padding-#{$name}, var(--padding-#{$name}, #{map-get($value, padding)}));
        border-width: var(--button-border-width-#{$name}, var(--border-width-#{$name}, #{map-get($value, border-width)}));
    }
}

// set the color variables
$colors: (
  primary: (color: white, base: primary),
  danger: (color: white, base: danger),
  success: (color: white, base: success),
  warning: (color: white, base: warning),
  secondary: (color: black, base: neutral),
  brand: (color: black, base: neutral)
);

@each $name, $properties in $colors {
  $base: map-get($properties, 'base');
  $color: map-get($properties, 'color');
  
  :host([color="#{$name}"]) {
    --button-background: var(--o-color-#{$base}-500);
    --button-color: var(--o-color-#{$color});

    --button-background-hover: var(--o-color-#{$base}-700);
    --button-color-hover: var(--o-color-#{$color});

    --button-background-active: var(--o-color-#{$base}-600);
    --button-color-active: var(--o-color-#{$color});

    --button-background-disabled: var(--o-color-neutral-300);
    --button-color-disabled: var(--o-color-neutral-700);
  }
}

// :host([color="secondary"]) {
//     --button-background: var(--o-color-neutral-100);
//     --button-color: var(--o-color-text);

//     --button-background-hover: var(--o-color-neutral-300);
//     --button-color-hover: var(--o-color-black);

//     --button-background-active: var(--o-color-neutral-200);
//     --button-color-active: var(--o-color-black);
// }

:host([disabled]) {
    cursor: var(--button-cursor-disabled, not-allowed);
}

// filled
:host([variant="filled"]) {
    --background: var(--button-background-color-filled, var(--button-background));
    --color: var(--button-text-color-filled, var(--button-color));
}
:host([variant="filled"]:hover) {
    --background: var(--button-background-color-filled-hover, var(--button-background-hover));
    --color: var(--button-text-color-filled-hover, var(--button-color-hover));
}
:host([variant="filled"]:active) {
    --background: var(--button-background-color-filled-active, var(--button-background-active));
    --color: var(--button-text-color-filled-active, var(--button-color-active));
}
:host([variant="filled"][disabled]) {
    --background: var(--button-background-color-filled-disabled, var(--button-background-disabled));
    --color: var(--button-text-color-filled-disabled, var(--button-color-disabled));
}

// outlined
:host([variant="outlined"]) {
    border-color: var(--button-border-color-outlined, var(--button-background));
    border-style: var(--button-border-style, solid);
    --background: transparent;
}
:host([variant="outlined"]:hover) {
    border-color: var(--button-border-color-outlined-hover, var(--button-background-hover));
    --background: var(--o-button-outlined-hover-background, var(--o-color-hover-200));
}
:host([variant="outlined"]:active) {
    border-color: var(--button-border-color-outlined-active, var(--button-background-active));
    --background: var(--o-button-outlined-active-background, var(--o-color-hover-400));
}
:host([variant="outlined"][disabled]) {
    border-color: var(--button-border-color-outlined-disabled, var(--button-background-disabled));
    --color: var(--o-button-outlined-disabled-text-color, var(--button-color-disabled));
    --background: transparent;
}

:host([variant="clear"]) {
    --background: transparent;
}
:host([variant="clear"]:hover) {
    --background: var(--o-button-clear-hover-background, var(--o-color-hover-200));
}
:host([variant="clear"]:active) {
    --background: var(--o-button-clear-active-background, var(--o-color-hover-400));
}
:host([variant="clear"][disabled]) {
    --color: var(--o-button-clear-disabled-text-color, var(--button-color-disabled));
    --background: transparent;
}

// underlined
:host([variant="underlined"]) {
    --background: transparent;
    text-decoration: underline;
    text-underline-offset: var(--gap-smaller);
    text-decoration-thickness: var(--button-underlined-thickness, 1px);
}
:host([variant="underlined"]:hover) {
    text-decoration-thickness: var(--button-underlined-hover-thickness, 2px);
}
:host([variant="underlined"]:active) {
    text-decoration-thickness: var(--button-underlined-active-thickness, 3px);
}
:host([variant="underlined"][disabled]) {
    text-decoration-thickness: var(--button-underlined-disabled-thickness, 1px);
    --color: var(--o-button-underlined-disabled-text-color, var(--button-color-disabled));
    --background: transparent;
}