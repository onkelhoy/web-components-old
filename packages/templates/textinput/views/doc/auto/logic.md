PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and the types can you give me the following tables. 
1. properties (columns: name, default-value, type, description) 
2. events (columns: name - ex: 'click', type - ex: CustomEvent<ClickEvent>, description - when its being triggered etc) 
3.public functions (columns: name, arguments - ex: arg1:CustomType, arg2?: boolean = true, arg3?: string, description - breif explenation what it does)

## SOURCE-CODE:
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


## TYPE-CODE: export {}