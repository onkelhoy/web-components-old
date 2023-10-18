// utils 
import { property } from "@pap-it/system-utils";

// templates
import { BaseSystem } from "@pap-it/system-base";

// local 
import { style } from "./style";
import { Mode } from "./types";

export class Accordion extends BaseSystem {
  static style = style;

  @property({ rerender: false, type: Boolean }) open: boolean = false;
  @property({ rerender: false }) mode: Mode = "vertical";

  render() {
    return `
            <div part="group">
                <slot></slot>
            </div>
        `
  }
}


declare global {
  interface HTMLElementTagNameMap {
    "pap-accordion": Accordion;
  }
}