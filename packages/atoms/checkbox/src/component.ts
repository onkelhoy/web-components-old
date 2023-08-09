// utils
import { html, property } from "@onkelhoy/tools-utils";

// templates
import { FieldTemplate } from "@onkelhoy/templates-field";

// local
import { style } from "./style";

export class Checkbox extends FieldTemplate {
    static style = style;

    @property({ rerender: false, onUpdate: "checkboxColorUpdate" }) color: string = "blue";

    constructor() {
        super();

        this.addEventListener("click", this.handleclick, true);
    }

    // update functions
    private checkboxColorUpdate = () => {
        if (this.inputElement)
        {
            this.inputElement.style.accentColor = this.color;
        }
    }
    private handleclick = (e:Event) => {
        e.stopPropagation();
        this.checked = !this.checked;
    }

    render() {
        return super.render(html`
            <input readonly type="checkbox" />
        `)
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "o-checkbox": Checkbox;
    }
}