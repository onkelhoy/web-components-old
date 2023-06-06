// utils 
import { html, property } from "@circular-tools/utils";

// templates
import { FieldTemplate } from '@circular-templates/field';

export class TextinputTemplate<T extends HTMLElement = HTMLInputElement> extends FieldTemplate<T> {
    @property() placeholder?: string;

    private lastselection_position = 0;

    // event functions
    protected handlekeyup = () => {
        const ss = (this.inputElement as any).selectionStart;
        if (typeof ss === "number")
        {
            this.lastselection_position = ss;
        }
        else this.lastselection_position = (this.inputElement as any).value.length;
    }

    // public functions
    public insert(text:string) {
        let newvalue = '';
        if (this.lastselection_position < (this.inputElement as any).value.length)
        {
            const v = (this.inputElement as any).value;
            newvalue = [v.slice(0, this.lastselection_position), text, v.slice(this.lastselection_position, v.length)].join('');
        }
        else 
        {
            newvalue = (this.inputElement as any).value + text;
        }

        this.value = newvalue;
        (this.inputElement as any).value = newvalue;
        this.lastselection_position += text.length;
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "o-textinput-template": TextinputTemplate;
    }
}
