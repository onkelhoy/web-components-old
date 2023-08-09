// utils 
import { html, property, query } from "@henry2/tools-utils";
import "@henry2/tools-translator/wc";

// atoms 
import { Accordion } from "@henry2/accordion";
import "@henry2/icon/wc";
import "@henry2/button/wc";
import "@henry2/accordion/wc";
import "@henry2/typography/wc";

// templates
import { BaseTemplate } from "@henry2/templates-base";
import "@henry2/templates-box/wc";

import { style } from "./style";

export type Variant = "warning" | "error" | "success";

export class Message extends BaseTemplate {
  static style = style;

  @property({ rerender: false }) variant: Variant = "success";
  @property({ rerender: false, type: Boolean, onUpdate: "onopenupdate" }) open = false;

  @query('o-accordion') accordionElement!: Accordion;

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
      <o-accordion open="${this.open}">
        <o-box-template radius="medium">
          <div class="left">
            <o-icon customSize="40" name="form.error"></o-icon>
            <o-icon customSize="40" name="form.success"></o-icon>
          </div>
          <div>
            <o-typography><slot></slot></o-typography>
          </div>
          <o-button @click="${this.handleclose}" radius="none" variant="clear">
            <o-icon customSize="32" name="close" cache></o-icon>
          </o-button>
        </o-box-template>
      </o-accordion>
    `
  }
}