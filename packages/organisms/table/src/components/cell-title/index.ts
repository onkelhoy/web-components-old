// utils 
import { html, property, query } from "@pap-it/system-utils";

// atoms 
import "@pap-it/typography/wc";
import "@pap-it/icon/wc";

// templates
import { BaseSystem } from "@pap-it/system-base";

import { style } from "./style";

export type SortDirection = "none" | "up" | "down";

export class CellTitle extends BaseSystem {
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

    if (this.sorting === "none") {
      this.sorting = "up";
    }
    else if (this.sorting === "up") {
      this.sorting = "down";
    }
    else {
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