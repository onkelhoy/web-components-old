// system
import { CustomElement } from "@pap-it/system-utils";

// local 
import { style } from "./style";

export class PrefixSuffix extends CustomElement {
  static style = style;

  render() {
    return `
      <slot part="prefix" name="prefix"></slot>
      <span part="content"><slot></slot></span>
      <slot part="suffix" name="suffix"></slot>
    `;
  }
}


declare global {
  interface HTMLElementTagNameMap {
    "pap-prefix-suffix-template": PrefixSuffix;
  }
}