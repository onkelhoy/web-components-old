PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and style code probided. Can you create a documentation that includes titles, short descrition and the table for each tables: css-variables, parts, slots.
css-variables should be a table with columns: (name, default-value, type - ex. CSS unit, description).
parts should include all elements that have been exposed with the part attribute ex: <p part='foo'> - and the table should then include columns: (name, description (short)).
slots should include columns: (name, default-value, description)

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
## STYLE-CODE:
:host {
    display: block;

    --table-row-color: var(--pap-table-row-color-light, var(--color-neutral-200, #FFF));
    --table-background-color: var(--pap-table-background-color-light, var(--color-neutral-100, #F8F8F8));
    --table-border-color: var(--pap-table-border-color-light, var(--color-neutral-600, #A6ADBA));

    table {
        background-color: var(--pap-table-background-color);
        width: 100%;

        tr {
            th:not(:last-child) {
                position: relative;

                &::after {
                    position: absolute;
                    right: 0;
                    top: 0;

                    height: 100%;
                    content: '';
                    pointer-events: none;
                    width: 1px;
                    background-color: var(--pap-table-border-color);
                }
            }
            td:not(:last-child) {
                border-right: 1px solid var(--pap-table-border-color);
            }
            &:not(:first-child):nth-child(2n + 1) {
                background-color: var(--pap-table-row-color);
            }
        }
    }

    footer {
        margin-top: var(--margin-small, 8px);
    }
}

@media (prefers-color-scheme: dark) {
    :host {
        --background: var(--pap-table-dark-background-color, var(--pap-color-black, black));
        --color: var(--pap-table-dark-text-color, var(--pap-color-neutral-50, white));
    }
}