// system
import { RenderType, html, property, query } from "@pap-it/system-utils";

// atoms 
// import "@pap-it/accordion";
// import "@pap-it/typography";
import "@pap-it/button";
import "@pap-it/icon";
// import "@pap-it/tooltip";

// molecules
import { Aside } from "@pap-it/aside";

// local 
import { style } from "./style";

export class Menu extends Aside {
  static styles = [...Aside.styles, style];

  @property({ attribute: 'header-title' }) headerTitle?: string;

  // event handlers 
  private handlecloseclick = () => {
    this.hide();
  }

  render(element?: RenderType) {
    return super.render(html`
      <header part="header">
        <span part="title">
          <slot name="title">
            <pap-typography 
              nowrap="true" 
              variant="T4"
            >
              ${this.headerTitle}
            </pap-typography>
          </slot>
        </span>

        <pap-button 
          @click="${this.handlecloseclick}" 
          variant="clear" 
          color="secondary" 
          circle="true"
          part="close"
        >
          <pap-icon cache="true" size="small" name="close"></pap-icon>
        </pap-button>
      </header>

      <main part="main">
        ${element}
      </main>
    `);
  }
}


declare global {
  interface HTMLElementTagNameMap {
    "pap-table-menu": Menu;
  }
}