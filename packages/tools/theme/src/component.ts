// utils 
// import { html, property } from "@pap-it/system-utils";

// templates
import { Base } from "@pap-it/system-base";

// local 
import { style } from "./style";

export class Theme extends Base {
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