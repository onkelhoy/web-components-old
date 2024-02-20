PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and the types can you give me the following tables.

1. properties (columns: name, default-value, type, description)
2. events (columns: name - ex: 'click', type - ex: CustomEvent<ClickEvent>, description - when its being triggered etc)
3.public functions (columns: name, arguments - ex: arg1:CustomType, arg2?: boolean = true, arg3?: string, description - breif explenation what it does)

## SOURCE-CODE

 // utils
import { html, property, query } from "@pap-it/system-utils";
import "@pap-it/tools-translator/wc";

// atoms
import "@pap-it/badge/wc";
import "@pap-it/typography/wc";
import "@pap-it/menu/wc";
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

## TYPE-CODE: export interface UserModel {

  firstname: string;
  lastname: string;
  avatar: string;
}
