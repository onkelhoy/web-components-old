PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and style code probided. Can you create a documentation that includes titles, short descrition and the table for each tables: css-variables, parts, slots.
css-variables should be a table with columns: (name, default-value, type - ex. CSS unit, description).
parts should include all elements that have been exposed with the part attribute ex: <p part='foo'> - and the table should then include columns: (name, description (short)).
slots should include columns: (name, default-value, description)

## SOURCE-CODE:
// utils 
import { html, property } from "@henry2/tools-utils";

// templates
import { BaseTemplate } from "@henry2/templates-base";
import { Placement } from "@henry2/templates-popover";
import "@henry2/templates-popover/wc";
import "@henry2/templates-box/wc";

// local 
import { style } from "./style";
// import { Foo, ClickEvent } from "./types";

export class Tooltip extends BaseTemplate {
    static style = style;

    @property() placement:Placement = "top-center";

    render() {
        return html`
            <o-popover-template revealby="hover" placement="${this.placement}">
                <slot slot="target" name="target"></slot>
                <o-box-template elevation="small"  part="card" radius="medium">
                    <slot></slot>
                </o-box-template>
            </o-popover-template>
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "o-tooltip": Tooltip;
    }
}
## STYLE-CODE:
:host {
    --background: var(--tooltip-light-background-color, var(--colors-netural-white, rgb(0, 0, 0)));
    --color: var(--tooltip-light-text-color, var(--colors-netural-black, rgb(255, 255, 255)));

    --popover-gap: var(--tooltip-popover-gap, 0.5rem);

    o-box-template {
        display: block;
        padding: var(--tooltip-card-padding, 0.5rem);
        background-color: var(--background);
        color: var(--color);
        min-width: var(--tooltip-card-minwidth, 3rem);
        position: relative;

        &::after {
            position: absolute;
            z-index: 2;
            content: '';
            width: var(--tooltip-arrow-size, 0.5rem);
            height: var(--tooltip-arrow-size, 0.5rem);

            background-image: linear-gradient(var(--background), var(--background));
            clip-path: polygon(50% 0, 100% 100%, 0 100%);
        }
    }
}

// TOP
:host([placement="top-left"]) o-box-template::after {
    top: calc(100% - 1px);
    right: var(--tooltip-arrow-offset, 0.5rem);
    transform: rotate(180deg);
}
:host([placement="top-center"]) o-box-template::after {
    top: calc(100% - 1px);
    left: 50%;
    transform: translateX(-50%) rotate(180deg);
}
:host([placement="top-right"]) o-box-template::after {
    top: calc(100% - 1px);
    left: var(--tooltip-arrow-offset, 0.5rem);
    transform: rotate(180deg);
}
// BOTTOM
:host([placement="bottom-left"]) o-box-template::after {
    top: 1px;
    right: var(--tooltip-arrow-offset, 0.5rem);
    transform: translateY(-100%);
}
:host([placement="bottom-center"]) o-box-template::after {
    top: 1px;
    left: 50%;
    transform: translate(-50%, -100%);
}
:host([placement="bottom-right"]) o-box-template::after {
    top: 1px;
    left: var(--tooltip-arrow-offset, 0.5rem);
    transform: translateY(-100%);
}
// LEFT
:host([placement="left-top"]) o-box-template::after {
    top: var(--tooltip-arrow-offset, 0.5rem);
    right: 1px;
    transform: translateX(100%) rotate(90deg);
}
:host([placement="left-center"]) o-box-template::after {
    top: 50%;
    right: 1px;
    transform: translate(100%, -50%) rotate(90deg);
}
:host([placement="left-bottom"]) o-box-template::after {
    right: 1px;
    bottom: var(--tooltip-arrow-offset, 0.5rem);
    transform: translateX(100%) rotate(90deg);
}
// RIGHT
:host([placement="right-top"]) o-box-template::after {
    top: var(--tooltip-arrow-offset, 0.5rem);
    left: 1px;
    transform: translateX(-100%) rotate(-90deg);
}
:host([placement="right-center"]) o-box-template::after {
    top: 50%;
    left: 1px;
    transform: translate(-100%, -50%) rotate(-90deg);
}
:host([placement="right-bottom"]) o-box-template::after {
    bottom: var(--tooltip-arrow-offset, 0.5rem);
    left: 1px;
    transform: translateX(-100%) rotate(-90deg);
}

@media (prefers-color-scheme: dark) {
    :host {
        --background: var(--tooltip-dark-background-color, var(--colors-netural-black, rgb(255, 255, 255)));
        --color: var(--tooltip-dark-text-color, var(--colors-netural-white, rgb(0, 0, 0)));
    }
}