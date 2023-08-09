// utils 
import { html, property, query } from "@henry2/tools-utils";

// atoms 
import "@henry2/typography/wc";
import "@henry2/icon/wc";

// templates
import { BaseTemplate } from "@henry2/templates-base";

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
      <o-typography variant="C2"><slot></slot></o-typography>
      <o-icon name="table.sort.none">SORT</o-icon>
      <o-icon name="table.sort.up">SORT UP</o-icon>
      <o-icon name="table.sort.down">SORT DOWN</o-icon>
    `
  }
}