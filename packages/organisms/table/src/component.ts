// system
import { html, query, property, ifDefined, debounce, CustomElement } from "@pap-it/system-utils";

// atoms 
import "@pap-it/typography/wc";
import "@pap-it/button/wc";
import "@pap-it/icon/wc";
import "@pap-it/input/wc";

// molecules
import { Pagination } from "@pap-it/pagination";
import "@pap-it/pagination/wc";

// tools
import { Translator } from "@pap-it/tools-translator";
import "@pap-it/tools-translator/wc";

// templates
import "@pap-it/templates-box/wc";

// local 
import { style } from "./style";
import { DefaultConfig, Config, IColumn, CustomAction, DataCell, DefaultCell, InputColumn } from "./types";
import { Header } from "./components/header";
import { Menu } from "./components/menu";
import { Export } from "./components/export";

export class Table extends Translator {
  static style = style;

  // queries
  @query('pap-pagination') paginationElement!: Pagination;
  @query('pap-table-menu') tablemenuElement!: Menu;
  @query<Header>({
    selector: 'pap-table-header', load: function (this: Table) {
      if (this.config) {
        this.tableheaderElement.config = this.config;
      }
    }
  }) tableheaderElement!: Header;

  // propterties
  @property({ attribute: 'table-title', context: true }) tableTitle?: string;
  @property({
    type: Object,
    context: true,
    attribute: false,
    after: function (this: Table) {
      if (!this.config.actions.filter) {
        if (this.originalQuerySelector('[slot=filter]')) {
          this.config.actions.filter = true;
        }
      }
    }
  }) config: Config = DefaultConfig(); // reapply attribute when spread exist..
  @property({
    type: Array,
    attribute: false,
    context: true,
    set: function (this: Table, value: (string | InputColumn)[]) {
      const ret: IColumn[] = [];
      for (let i = 0; i < value.length; i++) {
        let col: IColumn = {
          ...DefaultCell,
          order: i,
        }


        if (typeof value[i] === "string") {
          const str = value[i] as string;
          col.title = str;
          col.id = "column" + i;
        }
        else if (value[i] instanceof Object) {
          const obj = value[i] as InputColumn;
          col = {
            ...col,
            ...obj,
          }
        }

        ret.push(col);
      }

      return ret;
    }
  }) columns: IColumn[] = [];
  @property({
    type: Array,
    attribute: false,
    context: true,
    set: function (this: Table, value: any[][]) {
      if (value.length > 0 && !this.columns) {
        throw new Error("[TABLE] you must assign columns before assigning data!");
      }
      const ret: DataCell[][] = [];
      let size = 0;

      // NOTE costly operation but we should make sure its transpiled 
      for (let row = 0; row < value.length; row++) {
        const rowarray: DataCell[] = [];
        for (let col = 0; col < value[row].length; col++) {
          const data = value[row][col];
          size++;
          let cell: DataCell = {
            ...DefaultCell,
            value: 'missing'
          };

          if (typeof data === "string") {
            cell.value = data;
            cell.id = data;
          }
          else if (data instanceof Object) {
            cell = {
              ...cell,
              ...data,
            };
          }

          // check if column match by id 
          if (!this.columns.find(c => c.id === cell.id)) {
            cell.id = this.columns[col].id;
          }

          rowarray.push(cell);
        }
        ret.push(rowarray);
      }

      this.size = size;
      return ret;
    },
    after: function (this: Table) {
      this.initcolumns();
    }
  }) data: DataCell[][] = [];
  @property({ type: Boolean }) edit: boolean = false;
  @property({ type: Number }) size: number = 0;

  constructor() {
    super();
    this.initcolumns = debounce(this.initcolumns);

    // const slots = this.querySelectorAll('[slot]');
    // for (let slot of slots) {
    //   const name = slot.getAttribute('slot');
    //   if (name === "filter") 
    //   {
    //     if (!this.config.actions.filter) {
    //       console.log('yes')
    //     }
    //   }
    // }
  }

  get total() {
    if (this.config.pagination instanceof Object) {
      return this.config.pagination.total;
    }

    return this.data.length;
  }

  get pagination() {
    return this.paginationElement;
  }

  // event handlers
  private handlesave = (e: Event) => {
    console.log('save');
  }
  private handleactionclick = (e: CustomEvent) => {
    if (this.tablemenuElement) {
      const action = this.config.actions[e.detail.type];
      if (action instanceof Object) {
        this.tablemenuElement.headerTitle = (this.config.actions[e.detail.type] as CustomAction).name || e.detail.type;
      }
      else if (typeof action === "string") {
        this.tablemenuElement.headerTitle = this.config.actions[e.detail.type] as string;
      }
      else {
        this.tablemenuElement.headerTitle = e.detail.type
      }
      this.tablemenuElement.show();
    }
  }
  private handlesearch = (e: CustomEvent) => {
    this.dispatchEvent(new CustomEvent('search', { detail: { value: e.detail.value } }));
  }
  private handlefilterapply = (e: Event) => {
    this.dispatchEvent(new CustomEvent('filter-apply', { detail: (e instanceof CustomEvent ? e.detail : undefined) }));
  }
  private handlefilterreset = (e: Event) => {
    this.dispatchEvent(new Event('filter-reset'));
  }
  private handlepaginationchange = (e: Event) => {
    this.dispatchEvent(new Event('pagination'));
  }
  private handlesaveslotchange = (e: Event) => {
    if (e.target instanceof HTMLSlotElement) {
      if (e.target.assignedElements().length > 0) {
        if (!this.config.edit) {
          this.config.edit = true;
        }
      }
    }
  }
  private handlefilterslot = (e: Event) => {
    if (e.target instanceof HTMLSlotElement) {
      if (e.target.assignedNodes().length > 0) {
        if (!this.config.actions.filter) {
          this.config.actions.filter = true;
        }
      }
    }
  }
  private handlemainslot = (e: Event) => {
    if (e.target instanceof HTMLSlotElement) {
      const elements = e.target.assignedElements();
      for (let element of elements) {
        console.log('yes', element, element.getAttribute('slot'));
      }
    }
  }
  private handleexport = (e: Event) => {
    if (e.target instanceof Export) {
      this.dispatchEvent(new CustomEvent('export', {
        detail: {
          value: e.target.value
        }
      }));
    }
  }

  // public functions 
  public addData<T>(data: T[], convertor: (d: T) => DataCell[]) {
    let _data: DataCell[][] = [];
    for (let d of data) {
      _data.push(convertor(d));
    }

    this.data = _data;
  }

  // helper functions
  private actionMenus = () => {
    const actions = [];
    if (this.config.actions) {
      for (const key in this.config.actions) {
        let icon = key;
        if (this.config.actions[key] instanceof Object) {
          icon = (this.config.actions[key] as CustomAction).icon || icon;
        }
        actions.push(html`
          <pap-tab id="${key}">
            <div>
              <pap-icon container="smaller" size="small" cache="true" name="${icon}"></pap-icon>
              <pap-typography>${this.translateKey(key)}</pap-typography>
            </div>
          </pap-tab>
        `)

        if (key === "filter") {
          actions.push(html`
            <pap-tab-content id="${key}">
              <pap-table-filter key="filter" @apply="${this.handlefilterapply}" @reset="${this.handlefilterreset}">
                <slot @slotchange="${this.handlefilterslot}" name="filter"></slot>
              </pap-table-filter>
            </pap-tab-content>
          `)
        }
        else if (key === "export") {
          actions.push(html`
            <pap-tab-content id="${key}">
              <pap-table-export @change="${this.handleexport}"></pap-table-export>
            </pap-tab-content>
          `)
        }
        else {
          actions.push(html`
            <pap-tab-content id="${key}">
              ${key}
            </pap-tab-content>
          `)
        }
      }
    }

    return actions;
  }
  private initcolumns = () => {
    if (this.columns.length === 0 && this.data.length > 0) {
      this.columns = new Array<IColumn>(this.data[0].length).fill({ ...DefaultCell, order: 0 }).map((_v, i) => {
        return {
          ...DefaultCell,
          order: i,
        }
      })
    }
  }

  render() {
    return html`
      <pap-table-header 
        @action="${this.handleactionclick}"
        @save="${this.handlesave}"
        @search="${this.handlesearch}"
        part="header"
      >
        <slot @slotchange="${this.handlesaveslotchange}" name="save" slot="save"></slot>
        <slot slot="title" name="title"></slot>
      </pap-table-header>

      <slot style="display:none" @slotchange="${this.handlemainslot}"></slot>

      <pap-table-menu mode="fixed">
        <pap-tabs>
          ${this.actionMenus()}
        </pap-tabs>
      </pap-table-menu>
    
      <pap-box-template radius="medium" elevation="small" part="wrapper">
        <div>
          <table cellpadding="0" border="0" part="table">
            ${this.columns ? html`<colgroup key="colgroup">${this.columns.map(this.rendercolumngroup)}</colgroup>` : ''}
            ${this.columns ? html`<tr key="columns">${this.columns.map(this.rendercolumns)}</tr>` : ''}
            ${this.data.map(this.renderrows)}
          </table>  
        </div>
        
        <footer part="footer">
          ${this.config.pagination ? html`
            <pap-pagination 
              part="pagination"
              total="${this.total}"
              page="${this.pagination?.page}"
              @change="${this.handlepaginationchange}"
            >
            </pap-pagination>
          ` : ''}
        </footer>
      </pap-box-template>
    `
  }



  // render helpers 
  private rendercolumns = (column: IColumn, index: number) => {
    return html`
      <td key="col-${index}">
        <pap-table-column id="${column.id}"></pap-table-column>
      </td>
    `
  }
  private rendercolumngroup = (column: IColumn, index: number) => {
    let width = '';
    if (column.width !== undefined) {
      if (typeof column.width === "number") {
        width = column.width + "px";
      }
      else {
        width = column.width;
      }

      width = `width:${width};`;
    }
    return html`
      <col 
        key="col-group-${index}"
        style="${width}"
      />`
  }
  private renderrows = (row: DataCell[] = [], rowindex: number) => {
    return html`
      <tr class="row" key="row-${rowindex}">
        ${row.map((data, colindex) => this.rendercell(data, rowindex, colindex))}
      </tr>
    `
  }
  private rendercell = (data: DataCell, rowindex: number, colindex: number) => {
    return html`
      <td key="${rowindex}x${colindex}">
        <pap-table-cell 
          editable=""
          value="${data.value}"
          column-id="${data.id}"
        >
        </pap-table-cell>
      </td>
    `
  }
}


declare global {
  interface HTMLElementTagNameMap {
    "pap-table": Table;
  }
}