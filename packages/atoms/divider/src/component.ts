// system
import { html, property } from "@pap-it/system-utils";
import { BaseSystem } from "@pap-it/system-base";

// local 
import { style } from "./style";
import { Mode } from "./types";

export class Divider extends BaseSystem {
  static style = style;

  @property({ rerender: false }) mode: Mode = "horizontal";

  render() {
    return '<div part="line"></div>'
  }
}


declare global {
  interface HTMLElementTagNameMap {
    "pap-divider": Divider;
  }
}