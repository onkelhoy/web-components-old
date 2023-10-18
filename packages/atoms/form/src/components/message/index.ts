// utils 
import { html, property, query } from "@pap-it/system-utils";
import "@pap-it/tools-translator/wc";

// atoms 
import { Accordion } from "@pap-it/accordion";
import "@pap-it/icon/wc";
import "@pap-it/button/wc";
import "@pap-it/accordion/wc";
import "@pap-it/typography/wc";

// templates
import { BaseSystem } from "@pap-it/system-base";
import "@pap-it/templates-box/wc";

import { style } from "./style";

export type Variant = "warning" | "error" | "success";

export class Message extends BaseSystem {
  static style = style;

  @property({ rerender: false }) variant: Variant = "success";
  @property({ rerender: false, type: Boolean, onUpdate: "onopenupdate" }) open = false;

  @query('pap-accordion') accordionElement!: Accordion;

  // update handlers
  private onopenupdate = () => {
    if (this.accordionElement) {
      this.accordionElement.open = this.open;
    }
    else return 10;
  }
  // event handlers 
  private handleclose = () => {
    this.open = false;
  }

  render() {
    return html`
      <pap-accordion open="${this.open}">
        <pap-box-template radius="medium">
          <div class="left">
            <pap-icon customSize="40" name="form.error"></pap-icon>
            <pap-icon customSize="40" name="form.success"></pap-icon>
          </div>
          <div>
            <pap-typography><slot></slot></pap-typography>
          </div>
          <pap-button @click="${this.handleclose}" radius="none" variant="clear">
            <pap-icon customSize="32" name="close" cache></pap-icon>
          </pap-button>
        </pap-box-template>
      </pap-accordion>
    `
  }
}