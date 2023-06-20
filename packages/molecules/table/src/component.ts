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