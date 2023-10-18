PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and style code probided. Can you create a documentation that includes titles, short descrition and the table for each tables: css-variables, parts, slots.
css-variables should be a table with columns: (name, default-value, type - ex. CSS unit, description).
parts should include all elements that have been exposed with the part attribute ex: <p part='foo'> - and the table should then include columns: (name, description (short)).
slots should include columns: (name, default-value, description)

## SOURCE-CODE:
// utils 
import { html, property } from "@pap-it/system-utils";

// templates
import { BaseSystem } from "@pap-it/system-base";
import { Placement } from "@pap-it/templates-popover";
import "@pap-it/templates-popover/wc";
import "@pap-it/templates-box/wc";

// local 
import { style } from "./style";
// import { Foo, ClickEvent } from "./types";

export class Tooltip extends BaseSystem {
  static style = style;

  @property() placement: Placement = "top-center";

  render() {
    return html`
            <pap-popover-template revealby="hover" placement="${this.placement}">
                <slot slot="target" name="target"></slot>
                <pap-box-template elevation="small"  part="card" radius="medium">
                    <slot></slot>
                </pap-box-template>
            </pap-popover-template>
        `
  }
}


declare global {
  interface HTMLElementTagNameMap {
    "pap-tooltip": Tooltip;
  }
}
## STYLE-CODE:
:host {
    --background: var(--pap-tooltip-background-color-light, var(--pap-color-bg-inverse, #29292F));
    --color: var(--pap-tooltip-text-color-light, var(--pap-color-text-inverse, #FFFFFF));

    --popover-gap: var(--pap-tooltip-popover-gap, 0.5rem);

    pap-popover-template {
        display: inline-block;
    }

    pap-box-template {
        display: block;
        padding: var(--pap-tooltip-card-padding, 0.5rem);
        background-color: var(--background);
        color: var(--color);
        min-width: var(--pap-tooltip-card-minwidth, 3rem);
        position: relative;
        white-space: nowrap;

        &::after {
            position: absolute;
            z-index: 2;
            content: '';
            width: var(--pap-tooltip-arrow-size, 0.5rem);
            height: var(--pap-tooltip-arrow-size, 0.5rem);

            background-image: linear-gradient(var(--background), var(--background));
            clip-path: polygon(50% 0, 100% 100%, 0 100%);
        }
    }
}

// TOP
:host([placement="top-left"]) pap-box-template::after {
    top: calc(100% - 1px);
    right: var(--pap-tooltip-arrow-offset, 0.5rem);
    transform: rotate(180deg);
}
:host([placement="top-center"]) pap-box-template::after {
    top: calc(100% - 1px);
    left: 50%;
    transform: translateX(-50%) rotate(180deg);
}
:host([placement="top-right"]) pap-box-template::after {
    top: calc(100% - 1px);
    left: var(--pap-tooltip-arrow-offset, 0.5rem);
    transform: rotate(180deg);
}
// BOTTOM
:host([placement="bottom-left"]) pap-box-template::after {
    top: 1px;
    right: var(--pap-tooltip-arrow-offset, 0.5rem);
    transform: translateY(-100%);
}
:host([placement="bottom-center"]) pap-box-template::after {
    top: 1px;
    left: 50%;
    transform: translate(-50%, -100%);
}
:host([placement="bottom-right"]) pap-box-template::after {
    top: 1px;
    left: var(--pap-tooltip-arrow-offset, 0.5rem);
    transform: translateY(-100%);
}
// LEFT
:host([placement="left-top"]) pap-box-template::after {
    top: var(--pap-tooltip-arrow-offset, 0.5rem);
    right: 1px;
    transform: translateX(100%) rotate(90deg);
}
:host([placement="left-center"]) pap-box-template::after {
    top: 50%;
    right: 1px;
    transform: translate(100%, -50%) rotate(90deg);
}
:host([placement="left-bottom"]) pap-box-template::after {
    right: 1px;
    bottom: var(--pap-tooltip-arrow-offset, 0.5rem);
    transform: translateX(100%) rotate(90deg);
}
// RIGHT
:host([placement="right-top"]) pap-box-template::after {
    top: var(--pap-tooltip-arrow-offset, 0.5rem);
    left: 1px;
    transform: translateX(-100%) rotate(-90deg);
}
:host([placement="right-center"]) pap-box-template::after {
    top: 50%;
    left: 1px;
    transform: translate(-100%, -50%) rotate(-90deg);
}
:host([placement="right-bottom"]) pap-box-template::after {
    bottom: var(--pap-tooltip-arrow-offset, 0.5rem);
    left: 1px;
    transform: translateX(-100%) rotate(-90deg);
}