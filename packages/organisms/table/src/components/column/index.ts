// system 
import { ExtractSlotValue, Size, CustomElement, context, html, property } from "@pap-it/system-utils";

// atoms
import "@pap-it/typography";
import "@pap-it/button";
import "@pap-it/icon";

// local
import { style } from "./style";
import { IColumn, Config, DefaultConfig, Alignment, Sorting, Sort } from "../../types";

// @property({ spread: Spread.BREAKOUT, type: Object, verbose: true }) settings: Cell = DefaultCell;
export class Column extends CustomElement {
  static style = style;

  @property({
    after: function (this: Column) {
      this.findColumn();
    }
  }) id!: string;

  @property({ rerender: false }) size: Size = "medium";
  @property({ rerender: false }) align: Alignment = "left";
  @property() value: string = "";
  @property() sort: Sorting = "false";

  @property({ attribute: 'database-icon' }) databaseicon?: string;

  @context({
    update: function (this: Column) {
      this.findColumn();
    }
  }) columns: IColumn[] = [];
  @context({
    update: function (this: Column) {
      this.updateColumn();
    }
  }) config?: Config;

  private info?: IColumn;

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
    if (!this.config?.sort || this.sort === undefined) return;

    if (this.sort === "none") {
      this.sort = "asc";
    }
    else if (this.sort === "asc") {
      this.sort = "desc";
    }
    else if (this.sort === "desc") {
      this.sort = "none";
    }

    this.dispatchEvent(new Event('sort'));
  }

  // helper functions
  private findColumn() {
    if (this.id !== undefined) {
      if (this.columns && this.columns.length > 0) {
        const column = this.columns.find(c => c.id === this.id);
        if (column) {
          this.info = column;
          this.updateColumn();
        }
        else {
          console.warn('[table] could not find column, id:', this.id);
        }
      }
    }
  }
  private updateColumn() {

    if (!this.sort) {
      if (this.info?.sort) {
        this.sort = this.info.sort === true ? "none" : this.info.sort;
      }
      else if (this.info?.sort !== false && this.config?.sort) {
        this.sort = "none";
      }
    }

    if (this.info?.align) {
      this.align = this.info?.align;
    }
    if (this.info?.width !== undefined) {
      let width = '';
      if (typeof this.info?.width === "number") {
        width = this.info?.width + "px";
      }
      else {
        width = this.info?.width;
      }

      this.style.width = width;
    }

    this.requestUpdate();
  }

  render() {
    return html`
      ${this.info?.render ? html`<div key="main" class="rendered">${this.info.render()}</div>` : html`<div key="main">
        <div>
          ${this.info?.subtitle ? html`<pap-typography key="subtitle" variant="C4">${this.info.subtitle}</pap-typography>` : ''}
        </div>
        <div>
          ${this.info?.title ? html`<pap-typography key="column-title" variant="C2" weight="">${this.info.title}</pap-typography>` : ''}
          ${this.databaseicon ? `<pap-icon key="database"></pap-icon>` : ''}
        </div>
      </div>`}
      ${this.config?.sort && this.sort !== "false" ? html`
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