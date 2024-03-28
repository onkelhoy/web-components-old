// system 
import { ExtractSlotValue, Size, CustomElement, context, html, property } from "@pap-it/system-utils";

// atoms
import { Textarea } from "@pap-it/textarea";

// local
import { style } from "./style";
import { IColumn, Config, DefaultConfig, Alignment } from "../../types";

// @property({ spread: Spread.BREAKOUT, type: Object, verbose: true }) settings: Cell = DefaultCell;
export class Cell extends CustomElement {
  static style = style;

  @property() size: Size = "medium";
  @property() align?: Alignment;
  @property({ type: Boolean }) editable: boolean = false;
  @property() mode: "default" | "edit" = "default";
  @property() value: string = "";
  @property({
    attribute: 'column-id',
    after: function (this: Cell) {
      this.findColumn();
    }
  }) columnID!: string;

  // contexts
  @context() config: Config = DefaultConfig();
  @context({
    update: function (this: Cell) {
      this.findColumn();
    }
  }) columns: IColumn[] = [];
  @context() edit: boolean = false;

  private column?: IColumn;

  connectedCallback(): void {
    super.connectedCallback();

    this.addEventListener("click", this.handleclick);
    window.addEventListener("click", this.handlewindowclick);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener("click", this.handlewindowclick);
  }
  firstRender(): void {
    super.firstRender();
    if (!this.hasAttribute("tabindex")) this.tabIndex = 0;
  }

  // event handlers 
  private handleclick = (e: Event) => {
    e.stopPropagation();

    if (this.editable) {
      // should open form ? 
      // first check on cell level
      // second check on column level 
      // forth check on row level (?) 

      if (this.mode !== "edit") {
        this.mode = "edit";
      }
    }
  }
  private handlewindowclick = (e: Event) => {
    if (this.mode === "edit") {
      this.mode = "default";
    }
  }
  private handleinput = (e: Event) => {
    if (e.target instanceof HTMLInputElement) {
      this.value = e.target.value;
    }
  }

  // helper functions
  private findColumn() {
    if (this.columnID !== undefined) {
      if (this.columns && this.columns.length > 0) {
        const column = this.columns.find(c => c.id === this.columnID);
        if (column) {
          this.column = column;

          // if (column.sort) {
          //   this.sort = column.sort;
          // }
          if (!this.align && column.align) {
            this.align = column.align;
          }

          this.requestUpdate();
        }
        else {
          console.warn('[table] could not find column, id:', this.columnID);
        }
      }
    }
  }

  render() {
    return html`
      <div part="content">
        ${this.value}
      </div>
      <div part="edit">
        <input @input="${this.handleinput}" value="${this.value}" />
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pap-table-cell": Cell;
  }
}