// utils 
import { html, property, query } from "@onkelhoy/tools-utils";
import "@onkelhoy/tools-translator/wc";

// atoms
import "@onkelhoy/badge/wc";
import "@onkelhoy/typography/wc";
import "@onkelhoy/menu/wc";
import { Menu } from "@onkelhoy/menu";

// templates
import { BaseTemplate } from "@onkelhoy/templates-base";

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

                ${this.user ? html`<o-menu placement="bottom-left" @select="${this.handleuserselect}">
                    <img class="avatar" slot="button-prefix" src="${avatarlink}" alt="${this.user?.firstname || "no-name"} profile picture" />
                    <o-typography slot="button-content">${this.user?.firstname || "no-name"}</o-typography>

                    <o-menu-item value="settings">
                        <o-typography><o-translator>User Settings</o-translator></o-typography>
                    </o-menu-item>
                    <o-menu-item value="logout">
                        <o-typography><o-translator>Logout</o-translator></o-typography>
                    </o-menu-item>
                </o-menu>` : ''}
            </div>
            
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "o-header": Header;
    }
}