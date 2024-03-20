// utils 
import { html, CustomElement } from "@pap-it/system-utils";

import { style } from "./style";


export class Card extends CustomElement {
  static style = style;

  render() {
    return html`
      <slot name="header"></slot>
      <slot></slot>
    `
  }
}