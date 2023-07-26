// utils 
import { html, property, query } from "@circular-tools/utils";
import "@circular-tools/translator/wc";

// atoms 
import { Accordion } from "@circular/accordion";
import "@circular/icon/wc";
import "@circular/button/wc";
import "@circular/accordion/wc";
import "@circular/typography/wc";

// templates
import { BaseTemplate } from "@circular-templates/base";
import "@circular-templates/box/wc";

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