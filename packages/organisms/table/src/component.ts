// system
import { html, query, property, ifDefined, debounce } from "@pap-it/system-utils";

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
import { DefaultConfig, Config, IColumn, CustomAction, DataCell, DefaultCell } from "./types";
import { TableHeader } from "./components/table-header";
import { TableMenu } from "./components/table-menu";

export class Table extends Translator {
  static style = style;

  // queries
  @query('pap-pagination') paginationElement!: Pagination;
  @query('pap-table-menu') tablemenuElement!: TableMenu;
  @query<TableHeader>({
    selector: 'pap-table-header', load: function (this: Table) {
      if (this.config) {
        this.tableheaderElement.config = this.config;
      }

    }
  }) tableheaderElement!: TableHeader;

  // propterties
  @property({ attribute: 'table-title', context: true }) tableTitle?: string;
  @property({ type: Object, attribute: false, context: true }) config: Config = DefaultConfig;
  @property({
    type: Array,
    attribute: false,
    context: true,
    set: function (this: Table, value: any[]) {
      const ret: IColumn[] = [];
      for (let i = 0; i < value.length; i++) {
        let col: IColumn = {
          ...DefaultCell,
          order: i,
        }

        if (typeof value[i] === "string") {
          col.title = value[i];
          col.id = value[i];
        }
        else if (value[i] instanceof Object) {
          col = {
            ...col,
            ...value[i]
          }
        }

        ret.push(col);
      }

      console.log('columns', ret);
      return ret;
    }
  }) columns: IColumn[] = [];
  @property({
    type: Array,
    attribute: false,
    context: true,
    set: function (this: Table, value: any[][]) {
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
  }

  get total() {
    if (this.config.pagination instanceof Object) {
      return this.config.pagination.total;
    }

    return this.data.length;
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
    console.log('search', e.detail.value)
  }
  private handlefilterapply = (e: Event) => {
    console.log('filter', e);
  }

  // helper functions
  private actionMenus() {
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
              <pap-table-filter @apply="${this.handlefilterapply}">
                <slot name="filter"></slot>
              </pap-table-filter>
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
      ></pap-table-header>

      <pap-table-menu mode="fixed">
        <pap-tabs>
          ${this.actionMenus()}
        </pap-tabs>
      </pap-table-menu>

      <pap-box-template radius="medium" elevation="small" part="wrapper">
        <table cellpadding="0" border="0" part="table">
          
          ${this.columns ? html`<colgroup key="colgroup">${this.columns.map(this.rendercolumngroup)}</colgroup>` : ''}
          ${this.columns ? html`<tr key="columns">${this.columns.map(this.rendercolumns)}</tr>` : ''}
          ${this.data.map(this.renderrows)}
        </table>  
      
        <slot></slot>
        <footer part="footer">
          
          ${this.config.pagination ? html`<pap-pagination part="pagination" total="${this.total}"></pap-pagination>` : ''}
        </footer>
      </pap-box-template>
    `
  }

  // render helpers 
  private rendercolumns = (column: IColumn, index: number) => {
    return html`
      <td key="col-${index}">
        <pap-table-column
          column-title="${ifDefined(column.title)}"
          sub-title="${ifDefined(column.subtitle)}"
          sort="${ifDefined(column.sort || this.config.sort ? 'none' : undefined)}"
        ></pap-table-column>
      </td>
    `
  }
  private rendercolumngroup = (column: IColumn, index: number) => {
    return html`<col key="col-group-${index}" />`
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
          align="${data.align || 'left'}"
          value="${data.value}"
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