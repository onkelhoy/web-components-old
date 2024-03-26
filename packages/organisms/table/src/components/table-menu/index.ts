// system
import { RenderType, html, property, query } from "@pap-it/system-utils";

// atoms 
// import "@pap-it/accordion/wc";
// import "@pap-it/typography/wc";
import "@pap-it/button/wc";
import "@pap-it/icon/wc";
// import "@pap-it/tooltip/wc";

// molecules
import { Aside } from "@pap-it/aside";

// local 
import { style } from "./style";

export class TableMenu extends Aside {
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