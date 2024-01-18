// system
import { html, property, query } from "@pap-it/system-utils";

// atoms 
// import "@pap-it/accordion/wc";
// import "@pap-it/typography/wc";
import "@pap-it/button/wc";
import "@pap-it/icon/wc";
// import "@pap-it/tooltip/wc";

// tools
import { Translator } from "@pap-it/tools-translator";

// local 
import { style } from "./style";

export class TableMenu extends Translator {
  static styles = [style];

  @property({ type: Boolean }) open: boolean = false;
  @property({ type: Boolean }) inline: boolean = false;
  @property({ attribute: 'header-title' }) headerTitle?: string;

  // event handlers
  private handleclose = () => {
    this.open = false;
  }

  // public functions
  public show() {
    this.open = true;
  }
  public hide() {
    this.open = false;
  }

  render(element?: DocumentFragment) {
    return html`
      <header part="header">
        <span part="title">
          <slot name="title">
            <pap-typography 
              nowrap="true" 
              variant="T4"
            >
              ${this.headerTitle ? this.translateKey(this.headerTitle) : ''}
            </pap-typography>
          </slot>
        </span>

        <pap-button 
          @click="${this.handleclose}" 
          variant="clear" 
          color="secondary" 
          circle="true"
          part="close"
        >
          <pap-icon cache="true" name="close"></pap-icon>
        </pap-button>
      </header>

      ${element}
      <slot></slot>
    `
  }
}