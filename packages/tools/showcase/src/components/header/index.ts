// utils 
import { html, property, query } from "@henry2/tools-utils";

// atoms
import "@henry2/typography/wc";

// templates
import { BaseTemplate } from "@henry2/templates-base";

import { style } from "./style";

export class Header extends BaseTemplate {
  static style = style;

  @property() title: string = "Title";
  @property() subtitle: string = "Sub title"

  render() {
    return html`
      <div>
        <o-typography variant="H4">${this.title}</o-typography>
        <o-typography>${this.subtitle}</o-typography>
      </div>
    `
  }
}