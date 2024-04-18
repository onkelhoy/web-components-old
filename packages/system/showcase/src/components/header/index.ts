// utils 
import { html, property, CustomElement } from "@pap-it/system-utils";

// atoms
import "@pap-it/typography";

import { style } from "./style";

export class Header extends CustomElement {
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