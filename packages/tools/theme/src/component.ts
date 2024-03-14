// system
import { CustomElement } from "@pap-it/system-utils";

// local 
import { style } from "./style";

export class Theme extends CustomElement {
  static style = style;

  render() {
    return '';
  }
}


declare global {
  interface HTMLElementTagNameMap {
    "pap-theme-provider": Theme;
  }
}