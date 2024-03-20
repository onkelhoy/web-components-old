// system 
import { CustomElement, html, property, query } from "@pap-it/system-utils";

// atoms 
import "@pap-it/icon/wc";
import "@pap-it/button/wc";

// templates
import "@pap-it/templates-box/wc";

// local
import { style } from "./style";

export class Item extends CustomElement {
  static style = style;

  @query('pap-box-template') boxElement!: HTMLElement;

  @property({ type: Boolean, rerender: false }) dragged: boolean = false;

  // event handlers 
  private handleclick = () => {
    this.dispatchEvent(new Event("drag-start"));
  }

  render() {
    return html`
      <pap-button 
        @mousedown="${this.handleclick}"
        @touchstart="${this.handleclick}"
        circle="true" 
        color="secondary" 
        part="drag-button" 
        variant="clear"
        radius="small"
        size="small"
      >
        <pap-icon size="small" name="drag" cache="true"></pap-icon>
      </pap-button>
      <pap-box-template radius="medium" part="box">
        <slot></slot>
      </pap-box-template>
    `
  }
}