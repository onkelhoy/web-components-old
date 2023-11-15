// utils 
import { html } from "@papit/tools-utils";

// templates
import { FieldTemplate } from "@papit/templates-field";
import "@papit/templates-box/wc";

// local 
import { style } from "./style";

export class Toggle extends FieldTemplate {
    static style = style;

    constructor() {
        super();

        this.size = "small";

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
            <pap-box-template class="toggle" radius="circular">
                <div>
                    <span part="indicator"><slot></slot></span>
                </div>
            </pap-box-template>
        `);
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "pap-toggle": Toggle;
    }
}