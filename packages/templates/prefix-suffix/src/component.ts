// system
import { html, property } from "@pap-it/system-utils";
import { BaseSystem } from "@pap-it/system-base";

// local 
import { style } from "./style";

export class PrefixSuffixTemplate extends BaseSystem {
  static style = style;

  render() {
    return `
      <slot part="prefix" name="prefix"></slot>
      <span part="content" class="content"><slot></slot></span>
      <slot part="suffix" name="suffix"></slot>
    `;
  }
}


declare global {
  interface HTMLElementTagNameMap {
    "pap-prefix-suffix-template": PrefixSuffixTemplate;
  }
}