// system
import { property, CustomElement } from "@pap-it/system-utils";

// local 
import { style } from "./style";
import { Mode, Thickness } from "./types";

export class Divider extends CustomElement {
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