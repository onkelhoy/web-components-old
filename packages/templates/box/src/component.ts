// utils 
import { property, Radius } from "@pap-it/system-utils";

// templates
import { Base, RenderType } from "@pap-it/system-base";

// local 
import { style } from "./style";
import { Elevation } from "./types";

export class Box extends Base {
  static styles = [style];

  @property({ rerender: false }) radius: Radius = "circular";
  @property({ rerender: false }) elevation: Elevation = "none";
  @property({ rerender: false, attribute: 'elevation-direction' }) elevationdirection: 'vertical' | 'horizontal' = "vertical";

  render(): RenderType {
    return `
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pap-box-template": Box;
  }
}