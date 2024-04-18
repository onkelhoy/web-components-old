// utils 
import { html, property, CustomElement } from "@pap-it/system-utils";
import "@pap-it/tools-translator";

// atoms 
import "@pap-it/icon";
import "@pap-it/button";
import "@pap-it/accordion";
import "@pap-it/typography";

// templates
import "@pap-it/templates-box";

import { style } from "./style";

export type Variant = "warning" | "error" | "success";

export class Message extends CustomElement {
  static style = style;

  @property({ rerender: false }) variant: Variant = "success";
  @property({ type: Boolean }) open = false;

  // event handlers 
  private handleclose = () => {
    this.open = false;
  }

  render() {
    return html`
      <pap-accordion open="${this.open}">
        <pap-box-template radius="medium">
          <div class="left">
            <pap-icon custom-size="35" name="form.error"></pap-icon>
            <pap-icon custom-size="35" name="form.success"></pap-icon>
            <pap-icon custom-size="35" name="form.warning"></pap-icon>
          </div>
          <div>
            <pap-typography><slot></slot></pap-typography>
          </div>
          <pap-button color="secondary" @click="${this.handleclose}" circle="true" radius="none" variant="clear">
            <pap-icon size="small" name="close" cache></pap-icon>
          </pap-button>
        </pap-box-template>
      </pap-accordion>
    `
  }
}