// utils 
import { html, property } from "@circular-tools/utils";

// templates
import { BaseTemplate } from "@circular-templates/base";
import "@circular/icon/wc";
import "@circular/button/wc";

// local 
import { style } from "./style";

// types & interfaces 
export type SideMenuChangeEvent = { open: boolean };

export class SideMenu extends BaseTemplate {
    static style = style;

    @property({ type: Boolean, rerender: false }) open:boolean = true;

    private handlehamburgerclick = () => {
        this.open = !this.open;
        this.dispatchEvent(new CustomEvent<SideMenuChangeEvent>("change", { detail: { open: this.open } }))
    }

    render() {
        return html`
            <header>
                <slot name="header"></slot>
                <o-button @click="${this.handlehamburgerclick}" variant="clear" radius="none">
                    <o-icon size="large" class="closed" name="sidemenu-hamburger"></o-icon>
                    <o-icon size="large" class="open" name="sidemenu-hamburger-open"></o-icon>
                </o-button>
            </header>

            <slot></slot>
        `
    }
}