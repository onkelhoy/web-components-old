# SidebarContact

Atomic Type: molecules

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

// utils
import { html, property } from "@pap-it/system-utils";

// atoms
import "@pap-it/accordion/wc";
import "@pap-it/button/wc";
import "@pap-it/icon/wc";
import "@pap-it/typography/wc";
import "@pap-it/divider/wc";

// templates
import { Base } from "@pap-it/system-base";
import "@pap-it/templates-box/wc";

// local
import { style } from "./style";
import { Contact } from "./types";

export class SidebarContact extends Base {
  static style = style;

  @property({ type: Boolean }) open: boolean = false;
  @property({ type: Array }) contacts: Contact[] = [];

  private handleHeaderClick = () => {
    this.open = !this.open;
  }

  private getContact = (contact: Contact, index: number) => {
    const buttons = [];
    if (contact.email) {
      buttons.push(html`
                <pap-button
                    variant="clear"
                    mode="fill"
                    color="secondary"
                    href="mailto:${contact.email}"
                >
                    <pap-translator>Write an email</pap-translator>
                </pap-button>
            `);
    }
    if (contact.teams) {
      buttons.push(html`
                <pap-button
                    variant="clear"
                    mode="fill"
                    color="secondary"
                    href="https://teams.microsoft.com/l/call/0/0?users=${contact.teams}"
                >
                    <pap-translator>Call via Teams</pap-translator>
                </pap-button>
            `);
    }

    console.log('has phone?', contact.phone)

    return html`
            <div>
                <pap-typography variant="C4">${contact.role}</pap-typography>
                <pap-typography variant="C2">${contact.name}</pap-typography>
            </div>
            ${contact.phone ? html`
                <div>
                    <pap-icon name="phone"></pap-icon>
                    <pap-typography><a href="tel:${contact.phone}">${contact.phone}</a></pap-typography>
                </div>
            ` : ''}
            ${buttons.length > 0 ? html`<div>${buttons}</div>` : ''}
            ${index < this.contacts.length - 1 ? '<pap-divider></pap-divider>' : ''}
        `;
  }

  render() {

    const contacts = this.contacts.map(this.getContact);

    return html`
            <pap-box-template part="collapsed"><pap-icon name="phone"></pap-icon></pap-box-template>
            <pap-box-template radius="medium" part="base">
                <header part="header" @click="${this.handleHeaderClick}">
                    <pap-typography variant="C4"> <pap-translator>Contact</pap-translator> </pap-typography>
                    <pap-icon size="small" name="caret"></pap-icon>
                </header>
                <pap-accordion open="${this.open}">
                    <pap-divider></pap-divider>
                    ${contacts.length > 0 ? contacts : '<pap-typography> <pap-translator>No available contacts</pap-translator> </pap-typography>'}
                </pap-accordion>
            </pap-box-template>
        `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pap-sidebar-contact": SidebarContact;
  }
}

## REGISTER-CODE

import { SidebarContact } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('pap-sidebar-contact')) {
  cElements.define('pap-sidebar-contact', SidebarContact);
}
PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and the types can you give me the following tables.

1. properties (columns: name, default-value, type, description)
2. events (columns: name - ex: 'click', type - ex: CustomEvent<ClickEvent>, description - when its being triggered etc)
3.public functions (columns: name, arguments - ex: arg1:CustomType, arg2?: boolean = true, arg3?: string, description - breif explenation what it does)

## SOURCE-CODE

 // utils
import { html, property } from "@pap-it/system-utils";

// atoms
import "@pap-it/accordion/wc";
import "@pap-it/button/wc";
import "@pap-it/icon/wc";
import "@pap-it/typography/wc";
import "@pap-it/divider/wc";

// templates
import { Base } from "@pap-it/system-base";
import "@pap-it/templates-box/wc";

// local
import { style } from "./style";
import { Contact } from "./types";

export class SidebarContact extends Base {
  static style = style;

  @property({ type: Boolean }) open: boolean = false;
  @property({ type: Array }) contacts: Contact[] = [];

  private handleHeaderClick = () => {
    this.open = !this.open;
  }

  private getContact = (contact: Contact, index: number) => {
    const buttons = [];
    if (contact.email) {
      buttons.push(html`
                <pap-button
                    variant="clear"
                    mode="fill"
                    color="secondary"
                    href="mailto:${contact.email}"
                >
                    <pap-translator>Write an email</pap-translator>
                </pap-button>
            `);
    }
    if (contact.teams) {
      buttons.push(html`
                <pap-button
                    variant="clear"
                    mode="fill"
                    color="secondary"
                    href="https://teams.microsoft.com/l/call/0/0?users=${contact.teams}"
                >
                    <pap-translator>Call via Teams</pap-translator>
                </pap-button>
            `);
    }

    console.log('has phone?', contact.phone)

    return html`
            <div>
                <pap-typography variant="C4">${contact.role}</pap-typography>
                <pap-typography variant="C2">${contact.name}</pap-typography>
            </div>
            ${contact.phone ? html`
                <div>
                    <pap-icon name="phone"></pap-icon>
                    <pap-typography><a href="tel:${contact.phone}">${contact.phone}</a></pap-typography>
                </div>
            ` : ''}
            ${buttons.length > 0 ? html`<div>${buttons}</div>` : ''}
            ${index < this.contacts.length - 1 ? '<pap-divider></pap-divider>' : ''}
        `;
  }

  render() {

    const contacts = this.contacts.map(this.getContact);

    return html`
            <pap-box-template part="collapsed"><pap-icon name="phone"></pap-icon></pap-box-template>
            <pap-box-template radius="medium" part="base">
                <header part="header" @click="${this.handleHeaderClick}">
                    <pap-typography variant="C4"> <pap-translator>Contact</pap-translator> </pap-typography>
                    <pap-icon size="small" name="caret"></pap-icon>
                </header>
                <pap-accordion open="${this.open}">
                    <pap-divider></pap-divider>
                    ${contacts.length > 0 ? contacts : '<pap-typography> <pap-translator>No available contacts</pap-translator> </pap-typography>'}
                </pap-accordion>
            </pap-box-template>
        `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pap-sidebar-contact": SidebarContact;
  }
}

## TYPE-CODE: export type Contact = {

  role: string;
  name: string;
  phone?: string;
  teams?: string;
  email?: string;
}PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and style code probided. Can you create a documentation that includes titles, short descrition and the table for each tables: css-variables, parts, slots.
css-variables should be a table with columns: (name, default-value, type - ex. CSS unit, description).
parts should include all elements that have been exposed with the part attribute ex: <p part='foo'> - and the table should then include columns: (name, description (short)).
slots should include columns: (name, default-value, description)

## SOURCE-CODE

// utils
import { html, property } from "@pap-it/system-utils";

// atoms
import "@pap-it/accordion/wc";
import "@pap-it/button/wc";
import "@pap-it/icon/wc";
import "@pap-it/typography/wc";
import "@pap-it/divider/wc";

// templates
import { Base } from "@pap-it/system-base";
import "@pap-it/templates-box/wc";

// local
import { style } from "./style";
import { Contact } from "./types";

export class SidebarContact extends Base {
  static style = style;

  @property({ type: Boolean }) open: boolean = false;
  @property({ type: Array }) contacts: Contact[] = [];

  private handleHeaderClick = () => {
    this.open = !this.open;
  }

  private getContact = (contact: Contact, index: number) => {
    const buttons = [];
    if (contact.email) {
      buttons.push(html`
                <pap-button
                    variant="clear"
                    mode="fill"
                    color="secondary"
                    href="mailto:${contact.email}"
                >
                    <pap-translator>Write an email</pap-translator>
                </pap-button>
            `);
    }
    if (contact.teams) {
      buttons.push(html`
                <pap-button
                    variant="clear"
                    mode="fill"
                    color="secondary"
                    href="https://teams.microsoft.com/l/call/0/0?users=${contact.teams}"
                >
                    <pap-translator>Call via Teams</pap-translator>
                </pap-button>
            `);
    }

    console.log('has phone?', contact.phone)

    return html`
            <div>
                <pap-typography variant="C4">${contact.role}</pap-typography>
                <pap-typography variant="C2">${contact.name}</pap-typography>
            </div>
            ${contact.phone ? html`
                <div>
                    <pap-icon name="phone"></pap-icon>
                    <pap-typography><a href="tel:${contact.phone}">${contact.phone}</a></pap-typography>
                </div>
            ` : ''}
            ${buttons.length > 0 ? html`<div>${buttons}</div>` : ''}
            ${index < this.contacts.length - 1 ? '<pap-divider></pap-divider>' : ''}
        `;
  }

  render() {

    const contacts = this.contacts.map(this.getContact);

    return html`
            <pap-box-template part="collapsed"><pap-icon name="phone"></pap-icon></pap-box-template>
            <pap-box-template radius="medium" part="base">
                <header part="header" @click="${this.handleHeaderClick}">
                    <pap-typography variant="C4"> <pap-translator>Contact</pap-translator> </pap-typography>
                    <pap-icon size="small" name="caret"></pap-icon>
                </header>
                <pap-accordion open="${this.open}">
                    <pap-divider></pap-divider>
                    ${contacts.length > 0 ? contacts : '<pap-typography> <pap-translator>No available contacts</pap-translator> </pap-typography>'}
                </pap-accordion>
            </pap-box-template>
        `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pap-sidebar-contact": SidebarContact;
  }
}

## STYLE-CODE

:host {
    display: flex;
    justify-content: center;
    container-type: inline-size;

    pap-box-template[part="collapsed"] {
        background-color: var(--pap-color-bg-secondary, #F6F7F8);
        padding: var(--padding-small, 8px);
        align-items: center;
        justify-content: center;
        display: none;
    }

    pap-box-template[part="base"] {
        background-color: var(--pap-color-bg-secondary, #F6F7F8);
        display: block;
        padding-inline: var(--padding-medium, 16px);
        flex-grow: 1;

        header {
            display: flex;
            justify-content: space-between;
            padding-block: var(--padding-medium, 16px);
            align-items: center;
            cursor: pointer;
            color: var(--pap-color-text-secondary, #6E7087);

            pap-icon {
                rotate: -90deg;
                transition: rotate ease 30ms;
            }
        }

        pap-accordion[open="true"] {
            padding-bottom: var(--padding-small, 8px);

            div {
                display: flex;
                gap: var(--gap-small, 8px);
                flex-direction: column;
            }

            div:has(a) {
                color: var(--pap-color-text-secondary, #6E7087);
                flex-direction: row;
                height: var(--field-size-medium, 40px);
                align-items: center;

                a {
                    color: currentColor;
                    text-decoration: none;
                }
            }

            div:has(pap-button) {
                flex-direction: row;
            }
        }
    }
}

:host([open="true"]) {
    pap-box-template {
        header {
            pap-icon {
                rotate: 0deg;
            }
        }
    }
}

// 150px comes from sidebar-item
@container (max-width: 150px) {
    :host {
        pap-box-template[part="base"] {
            display: none;
        }
        pap-box-template[part="collapsed"] {
            display: inline-flex;
        }
    }
}
