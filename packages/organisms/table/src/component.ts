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
import { DefaultConfig, Config, IColumn, CustomAction, DataCell, DefaultCell, InputColumn, ICell, RowIdentifier, Sort, SortDirection, IEdit, CellComponent, StrictConfig, ChecklistToolbarConfig } from "./types";
import { Header } from "./components/header";
import { Menu } from "./components/menu";
import { Export } from "./components/export";
import { Cell } from "./components/cell";
import { Column } from "./components/column";
import { Checkbox } from "@pap-it/checkbox";
import { Tabs } from "@pap-it/tabs";

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
    set: function (this: Table, value: Config) {
      const _config: StrictConfig = {
        ...value,
        actions: {},
        checklist: undefined,
      };

      if (!value.actions.filter) {
        if (this.originalQuerySelector('[slot=filter]')) {
          _config.actions.filter = {
            name: 'filter',
            icon: 'filter'
          };
        }
      }

      for (const name in value.actions) {
        if (!value.actions[name]) continue;

        _config.actions[name] = {
          name,
          icon: name,
        };

        if (typeof value.actions[name] === "string") {
          _config.actions[name] = {
            name: value.actions[name] as string,
            icon: value.actions[name] as string,
          };
        }
        else if (value.actions[name] instanceof Object) {
          _config.actions[name] = value.actions[name] as CustomAction;
        }
      }

      if (value.checklist) {

        _config.checklist = {
          toolbar: {
            delete: {
              icon: "trash"
            }
          }
        };

        if (value.checklist instanceof Object) {
          if (value.checklist.toolbar) {
            if (value.checklist.toolbar instanceof Boolean) {
              _config.checklist.toolbar = {
                delete: {
                  icon: "trash"
                }
              }
            }
            else if (value.checklist.toolbar instanceof Object) {
              _config.checklist.toolbar = {}

              for (const name in value.checklist.toolbar) {
                if (value.checklist.toolbar[name]) {
                  let icon = name, callback = undefined;

                  if (value.checklist.toolbar[name] instanceof Object) {
                    const ctconfig = value.checklist.toolbar[name] as ChecklistToolbarConfig;
                    icon = ctconfig.icon;
                    callback = ctconfig.callback;
                  }
                  else if (name === 'delete') {
                    icon = 'trash'
                  }

                  _config.checklist.toolbar[name] = { icon, callback };
                }
              }
            }
          }
          else if (value.checklist.toolbar === false) {
            _config.checklist.toolbar = undefined;
          }
        }
      }

      // if (this.config.checkbox && this.columns.length > 0) {
      //   if (this.config?.checkbox) {
      //     this.columns = [{
      //       id: 'checklist',
      //       render: () => {
      //         return html`
      //           <pap-checkbox id="checklist-column"></pap-checkbox>
      //         `
      //       },
      //       order: 0,
      //     }, ...this.columns];
      //   }
      // }
      return _config;
    },
    after: function (this: Table) {
      this.columns = this.columnconfigs(this.columns);
    }
  }) config: StrictConfig = DefaultConfig(); // reapply attribute when spread exist..
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

      return this.columnconfigs(ret);
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
      return this.configdata(ret);
    },
    after: function (this: Table) {
      this.initcolumns();
    }
  }) data: DataCell[][] = [];
  @property({ type: Boolean, context: true }) edit: boolean = false;
  @property({ type: Number }) size: number = 0;

  public sort: Sort[] = [];

  private checkliststate: boolean | "intermediate" = false;
  private selectedRows: Map<string, DataCell[]> = new Map();

  public get SelectedRows() {
    // const slected = Array.from(this.selectedRows.values());
    // return slected.map(s => s.row);
    return this.selectedRows.values();
  }

  constructor() {
    super();
    this.initcolumns = debounce(this.initcolumns);
    this.changeselected = debounce(this.changeselected);
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
    this.save();
  }
  private handlemenutabchange = (e: Event) => {
    if (e.target instanceof Tabs && e.target.selected) {
      this.tablemenuElement.headerTitle = this.translateKey(e.target.selected);
    }
  }
  private handleactionclick = (e: CustomEvent) => {
    if (this.tablemenuElement) {
      // this.tablemenuElement.headerTitle = (this.config.actions[e.detail.type] as CustomAction).name || e.detail.type;
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
          this.config.actions.filter = {
            name: 'filter',
            icon: 'filter'
          }
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
  private handlechecklistchangecolumn = (e: Event) => {
    if (e.target instanceof Checkbox) {
      const allcells = this.shadowRoot?.querySelectorAll('pap-table-cell[column-id=checklist]'); // pap-table-cell[column-id=checklist]');
      if (e.target.checked === true) {
        if (allcells) {
          for (const cell of allcells) {
            if (cell.shadowRoot) {
              const checkboxes = cell.shadowRoot.querySelectorAll<Checkbox>('pap-checkbox');
              checkboxes.forEach(checkbox => {
                checkbox.checked = true;
              })
            }
          }
        }
      }
      else if (e.target.checked === false) {
        if (allcells) {
          for (const cell of allcells) {
            if (cell.shadowRoot) {
              const checkboxes = cell.shadowRoot.querySelectorAll<Checkbox>('pap-checkbox');
              checkboxes.forEach(checkbox => {
                checkbox.checked = false;
              })
            }
          }
        }
      }
    }
  }
  private handlechecklistchangeitem = (e: Event) => {
    if (e.target instanceof Checkbox) {
      const row = e.target.shadow_closest('tr');
      if (!row) throw new Error("[table]: could not determine row");

      const rowindex_str = row.getAttribute("data-rowindex");
      if (!rowindex_str) throw new Error("[table]: could not determine row-index");

      const rowindex = Number(rowindex_str);
      let rowid = row.getAttribute("data-rowid");
      if (!rowid) {
        rowid = this.getRowID(rowindex);
      }

      if (!e.target.checked && this.selectedRows.has(rowid)) {
        this.selectedRows.delete(rowid);
        this.checkliststate = false;

        if (this.selectedRows.size !== 0) {
          const rowids = Array.from(this.selectedRows.keys());
          for (const id of rowids) {
            if (this.checkliststate !== "intermediate" && this.shadowRoot?.querySelector(`tr[data-rowid="${id}"]`)) {
              this.checkliststate = "intermediate";
            }
          }
        }
      }
      else if (e.target.checked) {
        this.selectedRows.set(rowid, this.data[rowindex]);

        this.checkliststate = "intermediate";
        const allrows = this.shadowRoot?.querySelectorAll('tr.row');
        if (allrows) {
          let match = 0;
          for (let row of allrows) {
            const rowid = row.getAttribute('data-rowid');
            if (rowid && this.selectedRows.get(rowid)) {
              match++;
            }
          }

          if (match === allrows.length) {
            this.checkliststate = true;
          }
        }
      }
    }
    const checklistcolumn = this.querySelector<Column>('pap-table-column#checklist');
    if (checklistcolumn) {
      const checkbox = checklistcolumn.querySelector<Checkbox>('pap-checkbox')
      if (checkbox) {
        checkbox.checked = this.checkliststate;
      }
    }

    this.changeselected();
  }
  private handlecelledit = (e: Event) => {
    // TODO we must update the row-id 
    if (e.target instanceof Cell) {
      const row = e.target.shadow_closest("tr");
      if (!row) throw new Error("[table]: could not determine row");

      const rowindex_str = row.getAttribute("data-rowindex");
      if (!rowindex_str) throw new Error("[table]: could not determine row-index");

      const rowindex = Number(rowindex_str);
      row.setAttribute('data-rowid', this.getRowID(rowindex));
    }
  }
  private handlecolumnsort = (e: Event) => {
    if (this.config.sort && e.target instanceof Column) {
      const id = e.target.id;
      if (this.config.sort === "multiple") {
        if (e.target.sort === "none") {
          this.sort = this.sort.filter(s => s.id !== id);
        }
        else {
          const sort = e.target.sort as SortDirection;
          const index = this.sort.findIndex(s => s.id === id);
          if (index === -1) {
            this.sort.push({ id: e.target.id, direction: sort })
          }
          else {
            this.sort[index].direction = sort;
          }
        }
      }
      else {
        if (e.target.sort === "none") this.sort = [];
        else {
          this.sort = [{ id: e.target.id, direction: e.target.sort as SortDirection }]
        }
      }
    }

    this.dispatchEvent(new CustomEvent('sort', {
      detail: {
        value: this.sort
      }
    }))
    this.requestUpdate();
  }
  private handlechecklisttoolbaraction = (e: CustomEvent) => {
    this.dispatchEvent(new CustomEvent('checklist-action', {
      detail: {
        ...e.detail,
        selected: this.selectedRows
      }
    }));
  }

  // public functions 
  public addData<T>(data: T[], convertor: (d: T) => DataCell[]) {
    let _data: DataCell[][] = [];
    for (let d of data) {
      _data.push(convertor(d));
    }

    this.data = _data;
  }
  public save() {
    const cells = this.shadowRoot?.querySelectorAll('pap-table-cell');
    cells?.forEach(cell => {
      const data = cell.save();
      this.data[cell.rowindex][cell.colindex] = { ...this.data[cell.rowindex][cell.colindex], ...data };
    })
    this.dispatchEvent(new Event('context-data'));

    this.dispatchEvent(new Event('save'));
  }
  public cancel() {
    const cells = this.shadowRoot?.querySelectorAll('pap-table-cell');
    cells?.forEach(cell => {
      cell.cancel();
      // this.data[cell.rowindex][cell.colindex] = { ...this.data[cell.rowindex][cell.colindex], ...data };
    })
  }

  // helper functions
  private changeselected() {
    this.dispatchEvent(new CustomEvent('select', { detail: { value: this.SelectedRows } }));
    if (this.edit && this.config.checklist?.toolbar) this.requestUpdate();
  }
  private getRowID(rowindex: number) {
    if (this.pagination) {
      return String(this.pagination.page * this.pagination.perpage + rowindex);
    }

    return String(rowindex);
  }
  private actionMenus = () => {
    const actions = [];
    if (this.config.actions) {
      for (const key in this.config.actions) {
        // let icon = key;
        // if (this.config.actions[key] instanceof Object) {
        //   icon = (this.config.actions[key] as CustomAction).icon || icon;
        // }
        const { icon, name } = this.config.actions[key];
        actions.push(html`
          <pap-tab id="${key}">
            <div>
              <pap-icon container="smaller" size="small" cache="true" name="${icon}"></pap-icon>
              <pap-typography>${this.translateKey(name)}</pap-typography>
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
  private columnconfigs(columns: IColumn[]) {
    let cols = [...columns];
    if (this.config) {
      if (this.config.accordion) {
        if (cols[0]?.id !== "accordion") {
          cols = [
            {
              id: 'accordion',
              sort: false,
              order: 0,
              cellRender: () => {
                return '>'
              }
            },
            ...cols.map(c => ({
              ...c,
              order: c.order + 1
            })),
          ];
        }
      }
      if (this.config.checklist) {
        if (cols[0]?.id !== "checklist" || cols[1]?.id !== "checklist") {
          const checklistcolumn: IColumn = {
            id: 'checklist',
            order: 0,
            sort: false,
            render: () => {
              return html`
                <pap-checkbox 
                  @change="${this.handlechecklistchangecolumn}" 
                  size="large" 
                  id="checklist-column"
                >
                </pap-checkbox>
              `
            },
            cellRender: (cell: CellComponent) => {
              return html`
                <pap-checkbox 
                  @change="${this.handlechecklistchangeitem}"
                  checked="${this.selectedRows.has(this.getRowID(cell.rowindex))}" 
                  size="large" 
                >
                </pap-checkbox>
              `
            }
          }
          if (cols[0]?.id === "accordion") {

            // first case, we have accordion so we should inject checlisk at second place
            cols = [
              cols[0],
              {
                ...checklistcolumn,
                order: 1,
              },
              ...cols.splice(1, cols.length).map(c => ({
                ...c,
                order: c.order + 1
              }))
            ]
          }
          else {
            // second case, we dont have accordion so we should inject checklist at first place 
            cols = [
              checklistcolumn,
              ...cols.map(c => ({
                ...c,
                order: c.order + 1
              }))
            ]
          }
        }
      }
    }

    return cols;
  }
  private configdata(data: DataCell[][]) {
    if (this.config) {
      if (this.config.checklist || this.config.accordion) {
        let _data: DataCell[][] = [];
        for (let row of data) {
          let _row = [...row];
          if (this.config.accordion && _row[0]?.id !== "accordion") {
            _row = [
              {
                id: "accordion",
                value: ""
              },
              ..._row,
            ]
          }
          if (this.config.checklist && (_row[0]?.id !== "checklist" || _row[1]?.id !== "checklist")) {
            if (_row[0]?.id === "accordion") {
              _row = [
                _row[0],
                {
                  id: "checklist",
                  value: ""
                },
                ..._row.splice(1, _row.length)
              ]
            }
            else {
              _row = [
                {
                  id: "checklist",
                  value: ""
                },
                ..._row,
              ]
            }
          }

          _data.push(_row);
        }

        return _data;
      }
    }

    return data;
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
        <pap-tabs @change="${this.handlemenutabchange}">
          ${this.actionMenus()}
        </pap-tabs>
      </pap-table-menu>
    
      ${(this.config.checklist && this.edit && this.selectedRows.size > 0) ? html`<div part="checklist-toolbar-wrapper"><pap-table-checklist-toolbar @action="${this.handlechecklisttoolbaraction}" part="checklist-toolbar" count="${this.selectedRows.size}"></pap-table-checklist-toolbar></div>` : ''}
      <pap-box-template radius="medium" elevation="small" part="wrapper">
        <div part="inner-wrapper">
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
    const sort = column.sort === false ? "false" : (this.sort.find(s => s.id === column.id)?.direction || "none");
    return html`
      <td key="col-${index}">
        <pap-table-column sort="${sort}" @sort="${this.handlecolumnsort}" id="${column.id}"></pap-table-column>
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
      <tr class="row" key="row-${rowindex}" data-rowindex="${rowindex}" data-rowid="${this.getRowID(rowindex)}">
        ${row.map((data, colindex) => this.rendercell(data, rowindex, colindex))}
      </tr>
    `
  }
  private rendercell = (data: DataCell, rowindex: number, colindex: number) => {
    let edit: IEdit | undefined;
    if (data.editable) {
      if (data.editable instanceof Object) edit = data.editable;
      else {
        edit = {}
      }
    }
    else if (data.editable === undefined) {
      const column = this.columns[colindex];
      if (column.editable) {
        if (column.editable instanceof Object) edit = column.editable;
        else {
          edit = {}
        }
      }
    }

    return html`
      <td key="${rowindex}x${colindex}">
        <pap-table-cell 
          value="${data.value}"
          column-id="${data.id}"
          rowindex="${rowindex}"
          colindex="${colindex}"
          @change="${this.handlecelledit}"
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