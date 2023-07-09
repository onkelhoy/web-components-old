// utils 
import { html, property } from "@circular-tools/utils";

// templates
import { BaseTemplate } from "@circular-templates/base";
import { FieldTemplate } from "@circular-templates/field";
import "@circular-templates/box/wc";

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
    private handlekeyup = (e:Event) => {
        if (this.hasFocus) 
        {
            console.log('activate')
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