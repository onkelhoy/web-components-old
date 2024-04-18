# Table

Atomic Type: molecules

Version: 1.0.0

## Development

Development takes place within the `src` folder. To add a new subcomponent, use the command `npm run component:add`. This command updates the `.env` file, creates a view folder, and adds a subfolder in the `components` folder (creating it if it doesn't exist) inside `src` with all the necessary files.

Styling is managed in the `style.scss` file, which automatically generates a `style.ts` file for use in the component.

## Viewing

To view the component, run `npm start`. This command is equivalent to `npm run start demo` and launches the development server for the demo folder located within the `views` folder. This allows you to preview your component during development.

## Assets

All assets required by the component, such as icons and images for translations, should be placed in the `assets` folder. This folder will already include an `icons` and `translations` folder with an `en.json` file for English translations. Use this structure to organize translations and make them easily accessible for other projects.

For assets used solely for display or demo purposes, create a `public` folder under the relevant directory inside the `views` folder. These assets are not included in the component package.

## Commands

- **build**: Builds the component in development mode. Use the `--prod` flag (`npm run build -- --prod`) for a production build, which includes minification.
- **watch**: Watches for changes to the component files and rebuilds them automatically without starting the development server.
- **start**: Starts the development server for a specific demo. The target folder within the `views` directory must contain an `index.html` file. Usage example: `npm run start --name=<folder>`.
- **analyse**: Generates a comprehensive analysis file, mainly useful for React scripts and potentially for generating pages. The analysis file is only generated if it does not exist, unless the `--force` flag is used. Optional flags include `--verbose` and `--force`.
- **react**: Generates the necessary React code based on the web component code, including any subcomponents. The generated code will not overwrite existing files, allowing for manual customization. Flags: `--verbose` & `--force`.

PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and register code provided to you - could you create a rather simple introduction text with maybe a code example how to use in html - keep it very simple. Do not give example how to run the register code it's already included (this is for you so you can see the element-tag)! The introduction should be read by developers so it needs not to be simple enough for beginners!

## SOURCE-CODE

// utils
import { html, property, query } from "@pap-it/system-utils";

// molecules
import "@pap-it/pagination";

// templates
import { Base } from "@pap-it/system-base";

// local
import { style } from "./style";
import { Cell, Config, Data, HeaderCell } from './types';
import { Cell as CellElement } from "./components/cell";
import { CellTitle } from "./components/cell-title";

export class Table extends Base {
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

## REGISTER-CODE

import { Menu } from './components/menu';
import { CellTitle } from './components/cell-title';
import { Cell } from './components/cell';
import { Table } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('pap-table')) {
  cElements.define('pap-table', Table);
}
if (!cElements.get('pap-cell')) {
  cElements.define('pap-cell', Cell);
}
if (!cElements.get('pap-cell-title')) {
  cElements.define('pap-cell-title', CellTitle);
}
if (!cElements.get('pap-menu')) {
  cElements.define('pap-menu', Menu);
}
PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and the types can you give me the following tables.

1. properties (columns: name, default-value, type, description)
2. events (columns: name - ex: 'click', type - ex: CustomEvent<ClickEvent>, description - when its being triggered etc)
3.public functions (columns: name, arguments - ex: arg1:CustomType, arg2?: boolean = true, arg3?: string, description - breif explenation what it does)

## SOURCE-CODE

 // utils
import { html, property, query } from "@pap-it/system-utils";

// molecules
import "@pap-it/pagination";

// templates
import { Base } from "@pap-it/system-base";

// local
import { style } from "./style";
import { Cell, Config, Data, HeaderCell } from './types';
import { Cell as CellElement } from "./components/cell";
import { CellTitle } from "./components/cell-title";

export class Table extends Base {
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

## TYPE-CODE: import { IOption } from '@pap-it/dropdown'

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
}>PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and style code probided. Can you create a documentation that includes titles, short descrition and the table for each tables: css-variables, parts, slots.
css-variables should be a table with columns: (name, default-value, type - ex. CSS unit, description).
parts should include all elements that have been exposed with the part attribute ex: <p part='foo'> - and the table should then include columns: (name, description (short)).
slots should include columns: (name, default-value, description)

## SOURCE-CODE

// utils
import { html, property, query } from "@pap-it/system-utils";

// molecules
import "@pap-it/pagination";

// templates
import { Base } from "@pap-it/system-base";

// local
import { style } from "./style";
import { Cell, Config, Data, HeaderCell } from './types';
import { Cell as CellElement } from "./components/cell";
import { CellTitle } from "./components/cell-title";

export class Table extends Base {
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

## STYLE-CODE

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
