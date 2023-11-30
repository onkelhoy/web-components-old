// utils 
// import { html, property } from "@pap-it/system-utils";

// templates
import { BaseSystem } from "@pap-it/system-base";

// local 
import { style } from "./style";

export class ThemeTool extends BaseSystem {
  static style = style;

  render() {
    return '';
  }
}


declare global {
  interface HTMLElementTagNameMap {
    "pap-theme-provider": ThemeTool;
  }
}