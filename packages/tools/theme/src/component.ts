// utils 
// import { html, property } from "@henry2/tools-utils";

// templates
import { BaseTemplate } from "@henry2/templates-base";

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
        "o-theme-provider": ThemeTool;
    }
}