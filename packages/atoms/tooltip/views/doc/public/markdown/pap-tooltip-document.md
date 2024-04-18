# Tooltip

Atomic Type: atoms

Version: 1.0.0

## Development

Development takes place within the `src` folder. To add a new subcomponent, use the command `npm run component:add`. This command updates the `.env` file, creates a view folder, and adds a subfolder in the `components` folder (creating it if it doesn't exist) inside `src` with all the necessary files.

Styling is managed in the `style.scss` file, which automatically generates a `style.ts` file for use in the component.

## Viewing

To view the component, run `npm start`. This command is equivalent to `npm run start demo` and launches the development server for the demo folder located within the `views` folder. This allows you to preview your component during development.

## Assets

All assets required by the component, such as icons and images for translations, should be placed in the `assets` folder. This folder will already include an `icons` and `translations` folder with an `en.json` file for English translations. Use this structure to organize translations and make them easily accessible for other projects.

For assets used solely for display or demo purposes, create a `public` folder under the relevant directory inside the `views` folder. These assets are not included in the component package.

## Commands

- **build**: Builds the component in development mode. Use the `--prod` flag (`npm run build -- --prod`) for a production build, which includes minification.
- **watch**: Watches for changes to the component files and rebuilds them automatically without starting the development server.
- **start**: Starts the development server for a specific demo. The target folder within the `views` directory must contain an `index.html` file. Usage example: `npm run start --name=<folder>`.
- **analyse**: Generates a comprehensive analysis file, mainly useful for React scripts and potentially for generating pages. The analysis file is only generated if it does not exist, unless the `--force` flag is used. Optional flags include `--verbose` and `--force`.
- **react**: Generates the necessary React code based on the web component code, including any subcomponents. The generated code will not overwrite existing files, allowing for manual customization. Flags: `--verbose` & `--force`.

PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and register code provided to you - could you create a rather simple introduction text with maybe a code example how to use in html - keep it very simple. Do not give example how to run the register code it's already included (this is for you so you can see the element-tag)! The introduction should be read by developers so it needs not to be simple enough for beginners!

## SOURCE-CODE

// system
import { html, property } from "@pap-it/system-utils";
import { Base } from "@pap-it/system-base";
import { Placement } from "@pap-it/templates-popover";
import "@pap-it/templates-popover";
import "@pap-it/templates-box";

// local
import { style } from "./style";
// import { Foo, ClickEvent } from "./types";

export class Tooltip extends Base {
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

## REGISTER-CODE

import { Tooltip } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('pap-tooltip')) {
  cElements.define('pap-tooltip', Tooltip);
}
PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and the types can you give me the following tables.

1. properties (columns: name, default-value, type, description)
2. events (columns: name - ex: 'click', type - ex: CustomEvent<ClickEvent>, description - when its being triggered etc)
3.public functions (columns: name, arguments - ex: arg1:CustomType, arg2?: boolean = true, arg3?: string, description - breif explenation what it does)

## SOURCE-CODE

 // system
import { html, property } from "@pap-it/system-utils";
import { Base } from "@pap-it/system-base";
import { Placement } from "@pap-it/templates-popover";
import "@pap-it/templates-popover";
import "@pap-it/templates-box";

// local
import { style } from "./style";
// import { Foo, ClickEvent } from "./types";

export class Tooltip extends Base {
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

## TYPE-CODE: export {}PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is

 Based on the source code and style code probided. Can you create a documentation that includes titles, short descrition and the table for each tables: css-variables, parts, slots.
css-variables should be a table with columns: (name, default-value, type - ex. CSS unit, description).
parts should include all elements that have been exposed with the part attribute ex: <p part='foo'> - and the table should then include columns: (name, description (short)).
slots should include columns: (name, default-value, description)

## SOURCE-CODE

// system
import { html, property } from "@pap-it/system-utils";
import { Base } from "@pap-it/system-base";
import { Placement } from "@pap-it/templates-popover";
import "@pap-it/templates-popover";
import "@pap-it/templates-box";

// local
import { style } from "./style";
// import { Foo, ClickEvent } from "./types";

export class Tooltip extends Base {
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

## STYLE-CODE

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
