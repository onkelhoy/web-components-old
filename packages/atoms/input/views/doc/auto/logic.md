PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and the types can you give me the following tables. 
1. properties (columns: name, default-value, type, description) 
2. events (columns: name - ex: 'click', type - ex: CustomEvent<ClickEvent>, description - when its being triggered etc) 
3.public functions (columns: name, arguments - ex: arg1:CustomType, arg2?: boolean = true, arg3?: string, description - breif explenation what it does)

## SOURCE-CODE:
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

## TYPE-CODE: export type InputType = 
  | "text"
  | "number"
  | "tel"
  | "mail"
  | "password"
  | "search";