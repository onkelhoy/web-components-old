// utils 
import { html, property } from "@onkelhoy/tools-utils";

// templates
import { BaseTemplate } from "@onkelhoy/templates-base";
import { FieldTemplate } from "@onkelhoy/templates-field";
import "@onkelhoy/templates-box/wc";

// local 
import { style } from "./style";

export class Toggle extends FieldTemplate {
    static style = style;

    constructor() {
        super();

        this.addEventListener("click", this.handleclick);
        this.addEventListener("keyup", this.handlekeyup);
    }
    
    // event handlers
    private handlekeyup = (e:KeyboardEvent) => {
        if ((e.key || e.code).toLowerCase() === "enter")
        {
            if (this.hasFocus)
            {
                this.value = (!this.checked).toString();
            }
        }
    }
    private handleclick = () => {
        this.value = (!this.checked).toString();
    }

    render() {
        return super.render(html`
            <input type="checkbox" hidden />
            <o-box-template class="toggle" radius="circular">
                <div>
                    <span part="indicator"><slot></slot></span>
                </div>
            </o-box-template>
        `);
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "o-toggle": Toggle;
    }
}