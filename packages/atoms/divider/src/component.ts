// system
import { html, property } from "@pap-it/system-utils";
import { Base } from "@pap-it/system-base";

// local 
import { style } from "./style";
import { Mode, Thickness } from "./types";

export class Divider extends Base {
  static style = style;

  @property({ rerender: false }) mode: Mode = "horizontal";
  @property({ rerender: false }) thickness: Thickness = "default";

  render() {
    return '<div part="line"></div>'
  }
}


declare global {
  interface HTMLElementTagNameMap {
    "pap-divider": Divider;
  }
}