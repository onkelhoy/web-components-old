// utils 
import { html, property } from "@henry2/tools-utils";

// templates
import { BaseTemplate } from "@henry2/templates-base";
import "@henry2/icon/wc";

// local 
import { style } from "./style";

export class MenuItem extends BaseTemplate {
    static style = style;

    @property({ type: Boolean, rerender: false }) open:boolean = true;
    @property({ type: Boolean, rerender: false }) haschild:boolean = false;

    // event handlers
    private handleslotchange = (e:Event) => {
        const slot = e.currentTarget as HTMLSlotElement;
        const nodes = slot.assignedElements();

        if (nodes.length) 
        {
            this.haschild = true;
        }
        else 
        {
            this.haschild = false;
        }
    }
    private handlemenuclick = () => {
        this.open = !this.open;
    }

    render() {
        return html`
            <div class="menu" @click="${this.handlemenuclick}">
                <slot name="collapsed"></slot>
                <o-icon cache="true" customSize="10" name="caret"></o-icon>
                <slot></slot>
            </div>
            <div class="child">
                <slot name="sub" @slotchange="${this.handleslotchange}"></slot>
            </div>
        `
    }
}