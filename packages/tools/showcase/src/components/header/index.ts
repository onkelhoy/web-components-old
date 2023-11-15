// utils 
import { html, property, query } from "@papit/tools-utils";

// atoms
import "@papit/typography/wc";

// templates
import { BaseTemplate } from "@papit/templates-base";

import { style } from "./style";

export class Header extends BaseTemplate {
  static style = style;

  @property() title: string = "Title";
  @property() subtitle: string = "Sub title"

  render() {
    return html`
      <div>
        <pap-typography variant="H4">${this.title}</pap-typography>
        <pap-typography>${this.subtitle}</pap-typography>
      </div>
    `
  }
}