// utils 
import { html, property } from "@onkelhoy/tools-utils";

// molecules
import "@onkelhoy/header/wc";
import "@onkelhoy/navbar/wc";

// templates
import { BaseTemplate } from "@onkelhoy/templates-base";

// local 
import { style } from "./style";

export class SidebarHeaderTemplate extends BaseTemplate {
    static style = style;

    render() {
        return html`
            <div class="header">
                <slot name="header"><o-header></o-header></slot>
            </div>
            <div class="sidebar">
               <slot name="sidebar"><o-navbar></o-navbar></slot>
            </div>
            <div class="body">
                <slot></slot>
            </div>
            <div class="footer">
                <slot name="footer"></slot>
            </div>
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "o-sidebar-header-template": SidebarHeaderTemplate;
    }
}