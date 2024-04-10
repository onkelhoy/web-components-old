// system 
import { ExtractSlotValue, Size, CustomElement, context, html, property, debounce } from "@pap-it/system-utils";

// atoms
import "@pap-it/select/wc";

// local
import { style } from "./style";
import { IColumn, Config, DefaultConfig, Alignment, IEdit, DataCell, StrictConfig } from "../../types";
import { Select } from "@pap-it/select";

// @property({ spread: Spread.BREAKOUT, type: Object, verbose: true }) settings: Cell = DefaultCell;
export class Cell extends CustomElement {
  static style = style;

  @property() size: Size = "medium";
  @property() align?: Alignment;
  @property({
    set: function (this: Cell, value: string) {
      if (this.changedvalue !== null && this.changedvalue !== value) {
        return this.changedvalue;
      }

      return value;
    },
    after: function (this: Cell) {
      if (this.changedvalue === null && this.value) {
        this.changedvalue = this.value;
        this.originalvalue = this.value;
      }
    }
  }) value: string = "";
  @property({
    type: Number,
    rerender: false,
    after: function (this: Cell) {
      this.cellData = this.data?.[this.rowindex]?.[this.colindex];
    }
  }) rowindex: number = 0;
  @property({
    type: Number,
    rerender: false,
    after: function (this: Cell) {
      this.cellData = this.data?.[this.rowindex]?.[this.colindex];
    }
  }) colindex: number = 0;
  @property({
    attribute: 'column-id',
    after: function (this: Cell) {
      this.findColumn();
    }
  }) columnID!: string;

  // contexts
  @context() config: StrictConfig = DefaultConfig();
  @context({
    update: function (this: Cell) {
      this.findColumn();
    }
  }) columns: IColumn[] = [];
  @context({ applyattribute: true }) edit: boolean = false;
  @context({
    update: function (this: Cell) {
      this.cellData = this.data?.[this.rowindex]?.[this.colindex];
    }
  }) data: DataCell[][] = [];

  public columnData!: IColumn;
  public cellData!: DataCell;

  private changedvalue: string | null = null;
  private originalvalue: string | null = null;

  constructor() {
    super();

    this.change = debounce(this.change);
  }

  // connectedCallback(): void {
  //   super.connectedCallback();

  //   // this.addEventListener("click", this.handleclick);
  //   window.addEventListener("click", this.handlewindowclick);
  // }

  // disconnectedCallback(): void {
  //   super.disconnectedCallback();
  //   window.removeEventListener("click", this.handlewindowclick);
  // }
  firstRender(): void {
    super.firstRender();
    if (!this.hasAttribute("tabindex")) this.tabIndex = 0;
  }

  public save() {
    this.cellData.value = this.value;
    return this.cellData;
  }
  public cancel() {
    if (this.originalvalue) {
      this.changedvalue = this.originalvalue;
      this.value = this.originalvalue;
    }
  }

  // event handlers 
  // private handleclick = (e: Event) => {
  //   e.stopPropagation();
  //   let canedit = this.cellData.editable;
  //   if (canedit === undefined) canedit = this.columnData.editable;

  //   console.log('canedit', this.cellData, canedit, this.edit);

  //   if (canedit && this.edit) {
  //     // should open form ? 
  //     // first check on cell level
  //     // second check on column level 
  //     // forth check on row level (?) 

  //     if (this.mode !== "edit") {
  //       this.mode = "edit";
  //     }
  //   }
  // }
  // private handlewindowclick = (e: Event) => {
  //   if (this.mode === "edit") {
  //     this.mode = "view";
  //   }
  // }
  private handleinput = (e: Event) => {
    if (e.target instanceof HTMLInputElement) {
      this.changedvalue = e.target.value;
      this.value = e.target.value;
      this.change();
    }
  }
  private handleselectchange = (e: Event) => {
    if (e.target instanceof Select) {
      this.changedvalue = e.target.value || "";
      this.value = e.target.value || "";
    }
  }

  // helper functions
  private change() {
    this.dispatchEvent(new Event('change'));
  }
  private findColumn() {
    if (this.columnID !== undefined) {
      if (this.columns && this.columns.length > 0) {
        let column = this.columns.find(c => c.id === this.columnID);
        if (!column) column = this.columns[this.colindex];

        if (column) {
          this.columnData = column;

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
  private render_edit() {
    if (this.cellData?.editable || this.columnData?.editable) {
      if (this.cellData.options) {
        return html`
          <pap-select 
            @change="${this.handleselectchange}"
            radius="none" 
            value="${this.value}"
          >
            ${this.cellData.options.map((o, index) => {
          let value = o, text = o;
          if (o instanceof Object) {
            value = o.value;
            text = o.text;
          }
          return html`<pap-option key="${index}" value="${value}">${text}</pap-option>`
        })} 
          </pap-select>
          `;
      }
      else // if (!customEdit) // should open the table-menu
      {
        return html`<input @input="${this.handleinput}" value="${this.value}" />`
      }
    }

    // revert to normal render 
    return this.render_view();
  }
  private render_view() {
    if (this.cellData?.render) return this.cellData.render();
    if (this.columnData?.cellRender) return this.columnData.cellRender(this);

    if (this.cellData.options) {
      for (const o of this.cellData.options) {
        if (typeof o === "string") {
          if (o === this.value) return o;
        }
        else {
          if (o.value === this.value) return o.text;
          if (o.text === this.value) return o.text;
        }
      }
    }
    return this.value;
  }
  // return html`
  //   <div part="content">
  //     ${value}
  //   </div>
  //   <div part="edit">
  //     ${(this.cellData?.options && this.cellData.options?.length > 0) ?
  //     html`
  //       <pap-select 
  //         @change="${this.handleselectchange}"
  //         radius="none" 
  //         value="${this.value}"
  //       >
  //         ${this.cellData.options.map((o, index) => {
  //       let value = o, text = o;
  //       if (o instanceof Object) {
  //         value = o.value;
  //         text = o.text;
  //       }
  //       return html`<pap-option key="${index}" value="${value}">${text}</pap-option>`
  //     })} 
  //       </pap-select>
  //     ` : html`<input @input="${this.handleinput}" value="${this.value}" />`}
  //   </div>
  // `

  render() {
    return html`
      <div part="view">
        ${this.render_view()}
        <slot></slot>
      </div>
      <div part="edit">
        ${this.render_edit()}
        <slot name="edit"></slot>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pap-table-cell": Cell;
  }
}
