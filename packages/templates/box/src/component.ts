// utils 
import { property, Radius, RenderType, CustomElement } from "@pap-it/system-utils";

// local 
import { style } from "./style";
import { Elevation } from "./types";

export class Box extends CustomElement {
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