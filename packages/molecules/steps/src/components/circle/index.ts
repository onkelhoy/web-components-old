// utils 
import { html, property, query } from "@henry2/tools-utils";

// templates
import { BaseTemplate } from "@henry2/templates-base";

import { style } from "./style";

export type Status = "complete" | "active" | "incomplete";
export class Circle extends BaseTemplate {
  static style = style;

  @property({ rerender: false }) status: Status  = "incomplete"

  render() {
    return '<span></span>'
  }
}