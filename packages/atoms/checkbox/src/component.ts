// utils 
import { html, property } from "@circular-tools/utils";

// templates
import { FieldTemplate } from "@circular-templates/field";

// local 
import { style } from "./style";

export class Checkbox extends FieldTemplate {
    static style = style;

    @property({ rerender: false, onUpdate: "checkboxColorUpdate" }) color: string = "blue";

    // update functions
    private checkboxColorUpdate () {
        if (this.inputElement)
        {
            this.inputElement.style.accentColor = this.color;
        }
    }

    render() {
        return super.render(html`
            <input type="checkbox" ${this.checked ? 'checked="true"' : ""} />
        `)
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "o-checkbox": Checkbox;
    }
}