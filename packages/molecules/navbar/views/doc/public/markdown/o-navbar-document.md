# Navbar

Atomic Type: molecules

Version: 1.0.0

## Development 
Development servers can be started and should all exist inside `"views"` folder

## Scripts 
PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and register code provided to you - could you create a rather simple introduction text with maybe a code example how to use in html - keep it very simple. Do not give example how to run the register code it's already included (this is for you so you can see the element-tag)! The introduction should be read by developers so it needs not to be simple enough for beginners!

## SOURCE-CODE:
// utils 
import { html, property } from "@circular-tools/utils";
import "@circular-tools/translator/wc";

// atoms 
import "@circular/button/wc";
import "@circular/icon/wc";
import "@circular/divider/wc";
import "@circular/typography/wc";

// templates
import { BaseTemplate } from "@circular-templates/base";

// local 
import { style } from "./style";
import { Item } from "./types";

export class Navbar extends BaseTemplate {
    static style = style;

    @property({ type: Boolean, rerender: false }) open:boolean = true;

    private handlehamburgerclick = () => {
        this.open = !this.open;
        this.dispatchEvent(new Event("change"));
    }

    render() {
        return html`
            <section>
                <header>
                    <slot name="header">
                        <o-icon style="width:124px" size="large" name="interzero-logo"></o-icon>
                        <o-icon customSize="32" name="circular-logo"></o-icon>
                    </slot>
                    <o-button @click="${this.handlehamburgerclick}">
                        <o-icon size="large" class="closed" name="sidemenu-hamburger"></o-icon>
                        <o-icon size="large" class="open" name="sidemenu-hamburger-open"></o-icon>
                    </o-button>
                </header>
                <o-divider></o-divider>
                <div class="body">
                    <slot></slot>
                </div>
            </section>
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "o-navbar": Navbar;
    }
}
## REGISTER-CODE:
import { NavbarItem } from './components/navbar-item';
import { Navbar } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('o-navbar')) {
  cElements.define('o-navbar', Navbar);
}
if (!cElements.get('o-navbar-item')) {
  cElements.define('o-navbar-item', NavbarItem);
}
PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and the types can you give me the following tables. 
1. properties (columns: name, default-value, type, description) 
2. events (columns: name - ex: 'click', type - ex: CustomEvent<ClickEvent>, description - when its being triggered etc) 
3.public functions (columns: name, arguments - ex: arg1:CustomType, arg2?: boolean = true, arg3?: string, description - breif explenation what it does)

## SOURCE-CODE:
 // utils 
import { html, property } from "@circular-tools/utils";
import "@circular-tools/translator/wc";

// atoms 
import "@circular/button/wc";
import "@circular/icon/wc";
import "@circular/divider/wc";
import "@circular/typography/wc";

// templates
import { BaseTemplate } from "@circular-templates/base";

// local 
import { style } from "./style";
import { Item } from "./types";

export class Navbar extends BaseTemplate {
    static style = style;

    @property({ type: Boolean, rerender: false }) open:boolean = true;

    private handlehamburgerclick = () => {
        this.open = !this.open;
        this.dispatchEvent(new Event("change"));
    }

    render() {
        return html`
            <section>
                <header>
                    <slot name="header">
                        <o-icon style="width:124px" size="large" name="interzero-logo"></o-icon>
                        <o-icon customSize="32" name="circular-logo"></o-icon>
                    </slot>
                    <o-button @click="${this.handlehamburgerclick}">
                        <o-icon size="large" class="closed" name="sidemenu-hamburger"></o-icon>
                        <o-icon size="large" class="open" name="sidemenu-hamburger-open"></o-icon>
                    </o-button>
                </header>
                <o-divider></o-divider>
                <div class="body">
                    <slot></slot>
                </div>
            </section>
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "o-navbar": Navbar;
    }
}

## TYPE-CODE: export type SubItem = { id: string; text: string };
export type Item = SubItem & {
  icon: string;
  selected_icon: string;
  subitems: string[]; // this locks it to only 1 level
}PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and style code probided. Can you create a documentation that includes titles, short descrition and the table for each tables: css-variables, parts, slots.
css-variables should be a table with columns: (name, default-value, type - ex. CSS unit, description).
parts should include all elements that have been exposed with the part attribute ex: <p part='foo'> - and the table should then include columns: (name, description (short)).
slots should include columns: (name, default-value, description)

## SOURCE-CODE:
// utils 
import { html, property } from "@circular-tools/utils";
import "@circular-tools/translator/wc";

// atoms 
import "@circular/button/wc";
import "@circular/icon/wc";
import "@circular/divider/wc";
import "@circular/typography/wc";

// templates
import { BaseTemplate } from "@circular-templates/base";

// local 
import { style } from "./style";
import { Item } from "./types";

export class Navbar extends BaseTemplate {
    static style = style;

    @property({ type: Boolean, rerender: false }) open:boolean = true;

    private handlehamburgerclick = () => {
        this.open = !this.open;
        this.dispatchEvent(new Event("change"));
    }

    render() {
        return html`
            <section>
                <header>
                    <slot name="header">
                        <o-icon style="width:124px" size="large" name="interzero-logo"></o-icon>
                        <o-icon customSize="32" name="circular-logo"></o-icon>
                    </slot>
                    <o-button @click="${this.handlehamburgerclick}">
                        <o-icon size="large" class="closed" name="sidemenu-hamburger"></o-icon>
                        <o-icon size="large" class="open" name="sidemenu-hamburger-open"></o-icon>
                    </o-button>
                </header>
                <o-divider></o-divider>
                <div class="body">
                    <slot></slot>
                </div>
            </section>
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "o-navbar": Navbar;
    }
}
## STYLE-CODE:
:host {
    
}

@media (prefers-color-scheme: dark) {
    :host {
        --background: var(--navbar-dark-background-color, var(--colors-netural-black, black));
        --color: var(--navbar-dark-text-color, var(--colors-netural-white, white));
    }
}

:host([open="true"]) {
    transition: width 60ms ease-in;
    header {
        o-button {
            o-icon.open {
                display: block;
            }
            o-icon.closed {
                display: none;
            }
        }
    }
}
:host([open="false"]) {
    transition: width 150ms ease-in;
    width: 6rem;
    header {
        ::slotted(*) {
            display: none;
        }
        o-button {
            o-icon.open {
                display: none;
            }
            o-icon.closed {
                display: block;
            }
        }
    }
}