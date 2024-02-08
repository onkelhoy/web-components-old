// system 
import { html, property, query } from "@pap-it/system-utils";
import { Base } from "@pap-it/system-base";

// atoms
import { Menu } from "@pap-it/menu";
import "@pap-it/badge/wc";
import "@pap-it/typography/wc";
import "@pap-it/menu/wc";

// moldecules
import "@pap-it/language-menu/wc";
import "@pap-it/theme/wc";

// tootls
import "@pap-it/tools-translator/wc";

// local 
import { style } from "./style";
import { UserModel } from "./types";

export class Header extends Base {
  static style = style;

  @property({ type: Object }) user?: UserModel;

  // event handlers 

  private handleuserselect = (e: Event) => {
    console.log('select user', e)
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
        <pap-theme></pap-theme>
        <pap-language-menu></pap-language-menu>

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