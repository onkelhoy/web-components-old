// utils 
import { html, property } from "@circular-tools/utils";

// templates
import { FieldTemplate } from '@circular-templates/field';

// local 
import { style } from "./style";
import { InputType } from './types';

export class Input extends FieldTemplate<HTMLInputElement> {
    static style = style;

    @property() type: InputType = "text";
    @property() placeholder?: string;

    private lastselection_position = 0;

    // event functions
    private handlekeyup = () => {
        const ss = this.inputElement.selectionStart;
        if (typeof ss === "number")
        {
            this.lastselection_position = ss;
        }
        else this.lastselection_position = this.inputElement.value.length;
    }

    // public functions
    public insert(text:string) {
        let newvalue = '';
        if (this.lastselection_position < this.inputElement.value.length)
        {
            const v = this.inputElement.value;
            newvalue = [v.slice(0, this.lastselection_position), text, v.slice(this.lastselection_position, v.length)].join('');
        }
        else 
        {
            newvalue = this.inputElement.value + text;
        }

        this.value = newvalue;
        this.inputElement.value = newvalue;
        this.lastselection_position += text.length;
    }

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