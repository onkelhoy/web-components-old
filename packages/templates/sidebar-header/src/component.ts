// utils 
import { html } from "@henry2/tools-utils";

// molecules
import "@henry2/header/wc";
import "@henry2/navbar/wc";

// templates
import { BaseTemplate } from "@henry2/templates-base";

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
                <slot name="sidebar">
                    <o-navbar>
                        <slot name="sidebar-content"></slot>
                    </o-navbar>
                </slot>
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