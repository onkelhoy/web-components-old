// utils 
// import { html, property } from "@circular-tools/utils";

// templates
import { BaseTemplate } from "@circular-templates/base";

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