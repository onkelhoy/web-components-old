// system
import { html, property, CustomElement } from "@pap-it/system-utils";

// local 
import { style } from "./style";
import { Variant, Alignment } from "./types";

export class Typography extends CustomElement {
  static style = style;

  @property({ rerender: false }) variant: Variant = "C3";
  @property({ rerender: false }) align: Alignment = "initial";
  @property({ rerender: false, type: Boolean }) nowrap: boolean = false;
  @property({ rerender: false, type: Boolean }) truncate: boolean = false;

  render() {
    return `<slot></slot>`
  }
}


declare global {
  interface HTMLElementTagNameMap {
    "pap-typography": Typography;
  }
}