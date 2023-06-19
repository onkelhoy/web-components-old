# Table

Atomic Type: molecules

Version: 1.0.0

## Development 
Development servers can be started and should all exist inside `"views"` folder

## Scripts 
PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and register code provided to you - could you create a rather simple introduction text with maybe a code example how to use in html - keep it very simple. Do not give example how to run the register code it's already included (this is for you so you can see the element-tag)! The introduction should be read by developers so it needs not to be simple enough for beginners!

## SOURCE-CODE:
// utils 
import { html, property } from "@circular-tools/utils";

// templates
import { BaseTemplate } from "@circular-templates/base";

// local 
import { style } from "./style";

export class Table extends BaseTemplate {
    static style = style;

    render() {
        return html`
            <table>
                <thead>
                    
                </thead>
                <tbody>

                </tbody>
            </table>
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "o-table": Table;
    }
}
## REGISTER-CODE:
import { Menu } from './src/components/menu';
import { Cell } from './src/components/cell';
import { Table } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('o-table')) {
  cElements.define('o-table', Table);
}
if (!cElements.get('o-cell')) {
  cElements.define('o-cell', Cell);
}
if (!cElements.get('o-menu')) {
  cElements.define('o-menu', Menu);
}
PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and the types can you give me the following tables. 
1. properties (columns: name, default-value, type, description) 
2. events (columns: name - ex: 'click', type - ex: CustomEvent<ClickEvent>, description - when its being triggered etc) 
3.public functions (columns: name, arguments - ex: arg1:CustomType, arg2?: boolean = true, arg3?: string, description - breif explenation what it does)

## SOURCE-CODE:
 // utils 
import { html, property } from "@circular-tools/utils";

// templates
import { BaseTemplate } from "@circular-templates/base";

// local 
import { style } from "./style";

export class Table extends BaseTemplate {
    static style = style;

    render() {
        return html`
            <table>
                <thead>
                    
                </thead>
                <tbody>

                </tbody>
            </table>
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "o-table": Table;
    }
}

## TYPE-CODE: import { IOption } from '@circular/dropdown';

export interface Column {
  search: boolean;
  sortable: boolean;
  filter: boolean;
  id: string;
  value: string;
}
export interface Cell {
  id: string;
  value: string;
  options?: IOption[];
}
export interface Config {
  columns: Column[];
  data: 
}PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and style code probided. Can you create a documentation that includes titles, short descrition and the table for each tables: css-variables, parts, slots.
css-variables should be a table with columns: (name, default-value, type - ex. CSS unit, description).
parts should include all elements that have been exposed with the part attribute ex: <p part='foo'> - and the table should then include columns: (name, description (short)).
slots should include columns: (name, default-value, description)

## SOURCE-CODE:
// utils 
import { html, property } from "@circular-tools/utils";

// templates
import { BaseTemplate } from "@circular-templates/base";

// local 
import { style } from "./style";

export class Table extends BaseTemplate {
    static style = style;

    render() {
        return html`
            <table>
                <thead>
                    
                </thead>
                <tbody>

                </tbody>
            </table>
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "o-table": Table;
    }
}
## STYLE-CODE:
:host {
    display: block;
    padding: 1rem;
    --background: var(--table-light-background-color, var(--colors-netural-white, white));
    --color: var(--table-light-text-color, var(--colors-netural-black, black));

    background-color: var(--background);
    color: var(--color);
}

@media (prefers-color-scheme: dark) {
    :host {
        --background: var(--table-dark-background-color, var(--colors-netural-black, black));
        --color: var(--table-dark-text-color, var(--colors-netural-white, white));
    }
}