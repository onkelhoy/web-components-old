// system
import { html, property } from "@pap-it/system-utils";
import { Base } from "@pap-it/system-base";

// local 
import { style } from "./style";

export class ThemeContainer extends Base {
  static style = style;

  render() {
    return html`
      <pap-lightdark></pap-lightdark>
      <pap-theme-menu></pap-theme-menu>
    `
  }
}


declare global {
  interface HTMLElementTagNameMap {
    "pap-theme": ThemeContainer;
  }
}