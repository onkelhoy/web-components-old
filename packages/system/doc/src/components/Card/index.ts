// utils 
import { html, CustomElement, property } from "@pap-it/system-utils";

// atoms
import "@pap-it/accordion";
import "@pap-it/icon";
import "@pap-it/button";

import { style } from "./style";


export class Card extends CustomElement {
  static style = style;

  @property({ type: Boolean }) open: boolean = true;

  private handleclick = () => {
    this.open = !this.open;
  }

  render() {
    return html`
      <header part="header">
        <slot name="header"></slot>
        <pap-button color="secondary" variant="clear" circle="true" @click="${this.handleclick}">
          <pap-icon name="caret"></pap-icon>
        </pap-button>
      </header>
      <pap-accordion open="${this.open}">
        <slot></slot>
      </pap-accordion>
    `
  }
}