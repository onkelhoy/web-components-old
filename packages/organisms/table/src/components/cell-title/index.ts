// utils 
import { html, property, query } from "@papit/tools-utils";

// atoms 
import "@papit/typography/wc";
import "@papit/icon/wc";

// templates
import { BaseTemplate } from "@papit/templates-base";

import { style } from "./style";

export type SortDirection = "none" | "up" | "down";

export class CellTitle extends BaseTemplate {
  static style = style;

  @property({ rerender: false }) sorting: SortDirection = "none";
  @property({ rerender: false, type: Boolean }) canSort: boolean = true;

  constructor() {
    super();

    this.addEventListener("click", this.handleclick);
  }

  // event handlers 
  private handleclick = () => {
    if (!this.canSort) return;
    
    if (this.sorting === "none")
    {
      this.sorting = "up";
    }
    else if (this.sorting === "up")
    {
      this.sorting = "down";
    }
    else 
    {
      this.sorting = "none";
    }

    this.dispatchEvent(new Event("sorting"));
  }

  render() {
    return html`
      <pap-typography variant="C2"><slot></slot></pap-typography>
      <pap-icon name="table.sort.none">SORT</pap-icon>
      <pap-icon name="table.sort.up">SORT UP</pap-icon>
      <pap-icon name="table.sort.down">SORT DOWN</pap-icon>
    `
  }
}