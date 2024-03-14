// system
import { CustomElement, property } from "@pap-it/system-utils";

// local 
import { style } from "./style";

export class ThemeContainer extends CustomElement {
  static style = style;

  @property({ type: Boolean }) mode?: boolean = true;
  @property({ type: Boolean }) menu?: boolean = true;

  render() {
    return `
      ${this.mode ? '<pap-lightdark></pap-lightdark>' : ''}
      ${this.menu ? '<pap-theme-menu></pap-theme-menu>' : ''}
    `
  }
}


declare global {
  interface HTMLElementTagNameMap {
    "pap-theme": ThemeContainer;
  }
}