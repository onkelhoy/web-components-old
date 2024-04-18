PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and style code probided. Can you create a documentation that includes titles, short descrition and the table for each tables: css-variables, parts, slots.
css-variables should be a table with columns: (name, default-value, type - ex. CSS unit, description).
parts should include all elements that have been exposed with the part attribute ex: <p part='foo'> - and the table should then include columns: (name, description (short)).
slots should include columns: (name, default-value, description)

## SOURCE-CODE

// utils
import { html, property, query } from "@pap-it/system-utils";
import "@pap-it/tools-translator";

// atoms
import "@pap-it/badge";
import "@pap-it/typography";
import "@pap-it/menu";
import { Menu } from "@pap-it/menu";

// templates
import { Base } from "@pap-it/system-base";

// local
import { style } from "./style";
import { UserModel } from "./types";

export class Header extends Base {
    static style = style;

    @property({ type: Object }) user?: UserModel;

    // event handlers 
    
    private handleuserselect = (e:Event) => {
        console.log('select user', e)
    }
    // private handlelightnessselect = (e:Event) => {
    //     if (e.target instanceof Menu)
    //     {
    //         this.classList.remove('light-mode', 'dark-mode');
    //         if (e.target.value !== "auto") 
    //         {
    //             this.classList.add(`${e.target.value}-mode`);
    //         }
    //     }
    // }

    render() {
        const avatarlink = this.user?.avatar || `public/images/avatar${Math.round(Math.random() * 4) + 1}.png`
        return html`
            <div class="prefix">
                <slot name="prefix"></slot>
            </div>
            <div class="center">
                <slot></slot>
            </div>
            <div class="suffix">
                <pap-theme></pap-theme>
                <pap-language></pap-language>

                ${this.user ? html`<pap-menu placement="bottom-left" @select="${this.handleuserselect}">
                    <img class="avatar" slot="button-prefix" src="${avatarlink}" alt="${this.user?.firstname || "no-name"} profile picture" />
                    <pap-typography slot="button-content">${this.user?.firstname || "no-name"}</pap-typography>

                    <pap-menu-item value="settings">
                        <pap-typography><pap-translator>User Settings</pap-translator></pap-typography>
                    </pap-menu-item>
                    <pap-menu-item value="logout">
                        <pap-typography><pap-translator>Logout</pap-translator></pap-typography>
                    </pap-menu-item>
                </pap-menu>` : ''}
            </div>
            
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "pap-header": Header;
    }
}

## STYLE-CODE

:host,
:host > div {
    display: flex;
    align-items: center;
    gap: 1rem;
}

:host {
    justify-content: space-between;

    pap-menu::part(box) {
        min-width: 15rem;
    }

    div.icon-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        width: var(--field-size-medium, 40px);
        height: var(--field-size-medium, 40px);
    }
}

img.avatar {
    width: var(--field-size-medium, 40px);
    height: var(--field-size-medium, 40px);
    border-radius: 50%;
}

@media (prefers-color-scheme: light) {
    :host {
        pap-icon[name="dark-mode"] {
            display: none;
        }
    }
}
@media (prefers-color-scheme: dark) {
    :host {
        pap-icon[name="light-mode"] {
            display: none;
        }
    }
}

// overriding
:host(.dark-mode) {
    pap-icon[name="light-mode"] {
        display: none;
    }
    pap-icon[name="dark-mode"] {
        display: initial;
    }
}
:host(.light-mode) {
    pap-icon[name="dark-mode"] {
        display: none;
    }
    pap-icon[name="light-mode"] {
        display: initial;
    }
}
