PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and style code probided. Can you create a documentation that includes titles, short descrition and the table for each tables: css-variables, parts, slots.
css-variables should be a table with columns: (name, default-value, type - ex. CSS unit, description).
parts should include all elements that have been exposed with the part attribute ex: <p part='foo'> - and the table should then include columns: (name, description (short)).
slots should include columns: (name, default-value, description)

## SOURCE-CODE:
// utils 
import { html, property } from "@onkelhoy/tools-utils";
import "@onkelhoy/tools-translator/wc";

// atoms 
import "@onkelhoy/button/wc";
import "@onkelhoy/icon/wc";
import "@onkelhoy/divider/wc";
import "@onkelhoy/typography/wc";

// templates
import { BaseTemplate } from "@onkelhoy/templates-base";

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