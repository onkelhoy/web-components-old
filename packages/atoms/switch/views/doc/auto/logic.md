PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and the types can you give me the following tables.

1. properties (columns: name, default-value, type, description)
2. events (columns: name - ex: 'click', type - ex: CustomEvent<ClickEvent>, description - when its being triggered etc)
3.public functions (columns: name, arguments - ex: arg1:CustomType, arg2?: boolean = true, arg3?: string, description - breif explenation what it does)

## SOURCE-CODE

 // utils
import { html } from "@pap-it/system-utils";

// templates
import { Field } from "@pap-it/templates-field";
import "@pap-it/templates-box/wc";

// local
import { style } from "./style";

export class Switch extends Field {
    static style = style;

    constructor() {
        super();

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
            <pap-box-template class="Switch" radius="circular">
                <div>
                    <span part="indicator"><slot></slot></span>
                </div>
            </pap-box-template>
        `);
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "pap-switch": Switch;
    }
}

## TYPE-CODE: export {}
