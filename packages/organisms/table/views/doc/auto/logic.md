PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and the types can you give me the following tables. 
1. properties (columns: name, default-value, type, description) 
2. events (columns: name - ex: 'click', type - ex: CustomEvent<ClickEvent>, description - when its being triggered etc) 
3.public functions (columns: name, arguments - ex: arg1:CustomType, arg2?: boolean = true, arg3?: string, description - breif explenation what it does)

## SOURCE-CODE:
 // utils 
import { html, property, query } from "@pap-it/system-utils";

// molecules
import "@pap-it/pagination/wc";

// templates
import { BaseSystem } from "@pap-it/system-base";

// local 
import { style } from "./style";
import { Cell, Config, Data, HeaderCell } from './types';
import { Cell as CellElement } from "./components/cell";
import { CellTitle } from "./components/cell-title";

export class Table extends BaseSystem {
  static style = style;

  @property({ type: Object, attribute: false }) config: Config = {};
  @property({ type: Array, attribute: false }) rows: Data[][] = [];

  @query('table') tableElement!: HTMLTableElement;

  // event handlers 
  private handlecellchange = (e: Event) => {
    if (e.target instanceof CellElement) {
      console.log('change', e.target.value);
    }
  }
  private handlesorting = (e: Event) => {
    if (e.target instanceof CellTitle) {
      this.tableElement
        .querySelectorAll<CellTitle>('pap-cell-title')
        .forEach(element => {
          if (element !== e.target) {
            if (element.canSort) {
              element.sorting = 'none'
            }
          }
        })

      console.log('sorting', e.target.id, e.target.sorting)
    }
  }

  // private functions 
  private getCell(col: Data) {
    const colascell = col as Cell;
    const isstring = typeof col === "string";
    if (isstring || !colascell.header) {
      const value = isstring ? col : colascell.value;
      const allowEdit = this.config.canEdit !== undefined ? this.config.canEdit : isstring ? false : !!colascell.canEdit;

      return html`
                <td>
                    <pap-cell @change="${this.handlecellchange}" value="${value}" allowEdit="${allowEdit}"></pap-cell>
                </td>
            `
    }
    else {
      const colasheadercell = col as HeaderCell;
      let cansort = colasheadercell.sorting;
      if (cansort === undefined) {
        cansort = !!this.config.sorting;
      }

      return html`
                <th>
                    <pap-cell-title id="${colasheadercell.value}" @sorting="${this.handlesorting}" canSort="${cansort}">${colasheadercell.value}</pap-cell-title>
                </th>
            `
    }
  }
  private getRow = (row: Data[]) => {
    return html`
            <tr>
                ${row.map(data => this.getCell(data))}
            </tr>
        `
  }
  private getRows() {
    return this.rows.map(this.getRow);
  }

  render() {
    return html`
            <table cellspacing="0" cellpadding="0">
                ${this.getRows()}
            </table>
            <footer>
                ${this.config.pagination ? html`
                <pap-pagination perpage="5" total="${this.config.pagination.size || this.rows.length}"></pap-pagination> 
                ` : ''}
            </footer>
        `
  }
}


declare global {
  interface HTMLElementTagNameMap {
    "pap-table": Table;
  }
}

## TYPE-CODE: import { IOption } from '@pap-it/dropdown';

// data related types
type CellObject = {
  value: string;
  header?: boolean;
}
export type Cell = CellObject & { header: false } & Partial<{
  options: IOption[];
  canEdit: boolean;
}>;
export type HeaderCell = CellObject & { header: true } & Partial<{
  search: boolean;
  sorting: boolean;
  filter: boolean;
}>;
export type Data = string | Cell | HeaderCell;

// config related types
export type Pagination = {
  size: number;
  page: number;
  rowcount: number;
}
export type Direction = "horizontal" | "vertical";
export type Config = Partial<{
  ordering: boolean;
  sorting: boolean;
  direction: Direction;
  canEdit: boolean;
  pagination?: Pagination;
}>