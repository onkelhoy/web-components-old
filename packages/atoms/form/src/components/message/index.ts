// utils 
import { html, property, query } from "@papit/tools-utils";
import "@papit/tools-translator/wc";

// atoms 
import { Accordion } from "@papit/accordion";
import "@papit/icon/wc";
import "@papit/button/wc";
import "@papit/accordion/wc";
import "@papit/typography/wc";

// templates
import { BaseTemplate } from "@papit/templates-base";
import "@papit/templates-box/wc";

import { style } from "./style";

export type Variant = "warning" | "error" | "success";

export class Message extends BaseTemplate {
  static style = style;

  @property({ rerender: false }) variant: Variant = "success";
  @property({ rerender: false, type: Boolean, onUpdate: "onopenupdate" }) open = false;

  @query('pap-accordion') accordionElement!: Accordion;

  // update handlers
  private onopenupdate = () => {
    if (this.accordionElement) 
    {
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