// utils 
import { property, CustomElement } from "@pap-it/system-utils";

import { style } from "./style";

export type Status = "complete" | "active" | "incomplete";
export class Circle extends CustomElement {
  static style = style;

  @property({ rerender: false }) status: Status = "incomplete"

  render() {
    return '<span></span>'
  }
}