PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and the types can you give me the following tables.

1. properties (columns: name, default-value, type, description)
2. events (columns: name - ex: 'click', type - ex: CustomEvent<ClickEvent>, description - when its being triggered etc)
3.public functions (columns: name, arguments - ex: arg1:CustomType, arg2?: boolean = true, arg3?: string, description - breif explenation what it does)

## SOURCE-CODE

 // utils
import { property } from "@pap-it/system-utils";

// templates
import { Base, RenderType } from "@pap-it/system-base";

// local
import { style } from "./style";
import { Elevation, Radius } from "./types";

export class Box extends Base {
    static styles = [style];

    @property({ rerender: false }) radius: Radius = "circular";
    @property({ rerender: false }) elevation: Elevation = "none";

    render():RenderType {
        return `
            <slot></slot>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "pap-box-template": Box;
    }
}

## TYPE-CODE: // NOTE these are just for example purposes

export type Elevation = "none"|"small"|"medium"|"large";
export type Radius = 'none' | 'small' | 'medium' | 'large' | 'circular';
