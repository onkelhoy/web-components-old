// utils 
import { html, property, query } from "@pap-it/system-utils";

// atoms
import "@pap-it/typography/wc";

// templates
import { BaseSystem } from "@pap-it/system-base";

import { style } from "./style";

export class Header extends BaseSystem {
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