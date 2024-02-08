// utils 
import { html, property, query } from "@pap-it/system-utils";

// templates
import { Base } from "@pap-it/system-base";

import { style } from "./style";

export type Status = "complete" | "active" | "incomplete";
export class Circle extends Base {
  static style = style;

  @property({ rerender: false }) status: Status = "incomplete"

  render() {
    return '<span></span>'
  }
}