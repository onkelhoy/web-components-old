// utils 
// import { html, property } from "@papit/tools-utils";

// templates
import { BaseTemplate } from "@papit/templates-base";

// local 
import { style } from "./style";

export class ThemeTool extends BaseTemplate {
    static style = style;

    render() {
        return '';
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "pap-theme-provider": ThemeTool;
    }
}