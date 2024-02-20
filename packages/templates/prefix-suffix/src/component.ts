// system
import { Base } from "@pap-it/system-base";

// local 
import { style } from "./style";

export class PrefixSuffix extends Base {
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