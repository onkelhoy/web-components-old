// utils 
import { html, property } from "@circular-tools/utils";

// templates
import { FieldTemplate } from '@circular-templates/field';

// local 
import { style } from "./style";
import { InputType } from './types';

export class Input extends FieldTemplate {
    static style = style;

    @property() type: InputType = "text"

    // event functions

    render() {
        return super.render(html`
            <input type="${this.type}" />
        `)
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "o-input": Input;
    }
}