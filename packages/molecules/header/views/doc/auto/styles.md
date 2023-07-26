PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and style code probided. Can you create a documentation that includes titles, short descrition and the table for each tables: css-variables, parts, slots.
css-variables should be a table with columns: (name, default-value, type - ex. CSS unit, description).
parts should include all elements that have been exposed with the part attribute ex: <p part='foo'> - and the table should then include columns: (name, description (short)).
slots should include columns: (name, default-value, description)

## SOURCE-CODE:
// utils 
import { html, property, query } from "@circular-tools/utils";
import "@circular-tools/translator/wc";

// atoms
import "@circular/badge/wc";
import "@circular/typography/wc";
import "@circular/menu/wc";
import { Menu } from "@circular/menu";

// templates
import { BaseTemplate } from "@circular-templates/base";

// local 
import { style } from "./style";
import { UserModel } from "./types";

export class Header extends BaseTemplate {
    static style = style;

    @property({ type: Object }) user?: UserModel;

    // event handlers 
    
    private handleuserselect = (e:Event) => {
        
    }
    private handlelightnessselect = (e:Event) => {
        if (e.target instanceof Menu)
        {
            this.classList.remove('light-mode', 'dark-mode');
            if (e.target.value !== "auto") 
            {
                this.classList.add(`${e.target.value}-mode`);
            }
        }
    }

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
                <o-theme></o-theme>
                <o-language></o-language>
                <o-menu placement="bottom-left" @select="${this.handleuserselect}">
                    <img class="avatar" slot="button-prefix" src="${avatarlink}" alt="${this.user?.firstname || "no-name"} profile picture" />
                    <o-typography slot="button-content">${this.user?.firstname || "no-name"}</o-typography>

                    <o-menu-item value="settings">
                        <o-typography><o-translator>User Settings</o-translator></o-typography>
                    </o-menu-item>
                    <o-menu-item value="logout">
                        <o-typography><o-translator>Logout</o-translator></o-typography>
                    </o-menu-item>
                </o-menu>
            </div>
            
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "o-header": Header;
    }
}
## STYLE-CODE:
:host,
:host > div {
    display: flex;
    align-items: center;
    gap: 1rem;
}

:host {
    justify-content: space-between;

    o-menu::part(box) {
        min-width: 15rem;
    }

    div.icon-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        width: var(--container-size-medium);
        height: var(--container-size-medium);
    }
}

img.avatar {
    width: var(--container-size-medium);
    height: var(--container-size-medium);
    border-radius: 50%;
}

@media (prefers-color-scheme: light) {
    :host {
        o-icon[name="dark-mode"] {
            display: none;
        }
    }
}
@media (prefers-color-scheme: dark) {
    :host {
        o-icon[name="light-mode"] {
            display: none;
        }
    }
}

// overriding 
:host(.dark-mode) {
    o-icon[name="light-mode"] {
        display: none;
    }
    o-icon[name="dark-mode"] {
        display: initial;
    }
}
:host(.light-mode) {
    o-icon[name="dark-mode"] {
        display: none;
    }
    o-icon[name="light-mode"] {
        display: initial;
    }
}