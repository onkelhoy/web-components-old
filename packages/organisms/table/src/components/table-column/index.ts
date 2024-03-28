// system 
import { ExtractSlotValue, Size, CustomElement, context, html, property } from "@pap-it/system-utils";

// atoms
import "@pap-it/typography/wc";
import "@pap-it/button/wc";
import "@pap-it/icon/wc";

// local
import { style } from "./style";
import { IColumn, Config, DefaultConfig, Alignment, Sorting } from "../../types";

// @property({ spread: Spread.BREAKOUT, type: Object, verbose: true }) settings: Cell = DefaultCell;
export class Column extends CustomElement {
  static style = style;

  @property() size: Size = "medium";
  @property() align: Alignment = "left";
  @property() value: string = "";
  @property() sort?: Sorting;
  @property({ attribute: 'sub-title' }) subtitle?: string;
  @property({ attribute: 'column-title' }) columntitle?: string;
  @property({ attribute: 'database-icon' }) databaseicon?: string;


  connectedCallback(): void {
    super.connectedCallback();

    this.addEventListener("click", this.handlesortclick);
  }
  firstRender(): void {
    super.firstRender();
    if (!this.hasAttribute("tabindex")) this.tabIndex = 0;
  }

  // event handlers 
  private handlesortclick = () => {
    if (this.sort === "none") {
      this.sort = "asc";
    }
    else if (this.sort === "asc") {
      this.sort = "desc";
    }
    else if (this.sort === "desc") {
      this.sort = "none";
    }
  }

  render() {
    return html`
      <div>
        <div>
          ${this.subtitle ? html`<pap-typography key="subtitle" variant="C4">${this.subtitle}</pap-typography>` : ''}
        </div>
        <div>
          ${this.columntitle ? html`<pap-typography key="column-title" variant="C2" weight="">${this.columntitle}</pap-typography>` : ''}
          ${this.databaseicon ? `<pap-icon key="database"></pap-icon>` : ''}
        </div>
      </div>
      ${this.sort ? html`
        <div class="sort">
          <pap-icon name="sort.none" key="sort.none"></pap-icon>
          <pap-icon name="sort.asc" key="sort.asc"></pap-icon>
          <pap-icon name="sort.desc" key="sort.desc"></pap-icon>
        </div>
      `: ''}
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pap-table-column": Column;
  }
}