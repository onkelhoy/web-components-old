PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and the types can you give me the following tables.

1. properties (columns: name, default-value, type, description)
2. events (columns: name - ex: 'click', type - ex: CustomEvent<ClickEvent>, description - when its being triggered etc)
3.public functions (columns: name, arguments - ex: arg1:CustomType, arg2?: boolean = true, arg3?: string, description - breif explenation what it does)

## SOURCE-CODE

 // utils
import { html, property } from "@pap-it/system-utils";

// templates
import { BaseSystem } from "@pap-it/system-base";

// local
import { style } from "./style";
import { Variant, Alignment } from "./types";

export class Typography extends BaseSystem {
    static style = style;

    @property({ rerender: false }) variant: Variant = "C3";
    @property({ rerender: false }) align: Alignment = "initial";
    @property({ rerender: false, type: Boolean }) nowrap = false;

    render() {
        return html`
            <slot></slot>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "pap-typography": Typography;
    }
}

## TYPE-CODE: export type Variant = `${'C'|'T'|'H'}${1|2|3|4}`|'H5'

export type Alignment = "center" | "justify" | "start" | "end" | "left" | "right" | "unset" | "inherit" | "initial";
