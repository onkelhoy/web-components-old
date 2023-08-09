// utils 
import { html, property } from "@onkelhoy/tools-utils";

// templates
import { TextinputTemplate } from '@onkelhoy/templates-textinput';

// local 
import { style } from "./style";
import { InputType } from './types';

export class Input extends TextinputTemplate<HTMLInputElement> {
    static style = style;

    @property() type: InputType = "text";

    render() {
        return super.render(html`
            <input @click="${this.handlekeyup}" @keyup="${this.handlekeyup}" placeholder="${this.placeholder || ""}" type="${this.type}" value="${this.value || ""}" />
        `)
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "o-input": Input;
    }
}