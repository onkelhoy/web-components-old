PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and the types can you give me the following tables. 
1. properties (columns: name, default-value, type, description) 
2. events (columns: name - ex: 'click', type - ex: CustomEvent<ClickEvent>, description - when its being triggered etc) 
3.public functions (columns: name, arguments - ex: arg1:CustomType, arg2?: boolean = true, arg3?: string, description - breif explenation what it does)

## SOURCE-CODE:
 // utils 
import { html, property } from "@onkelhoy/tools-utils";

// templates
import { BaseTemplate } from "@onkelhoy/templates-base";

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

## TYPE-CODE: import { IOption } from '@onkelhoy/dropdown';

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
}