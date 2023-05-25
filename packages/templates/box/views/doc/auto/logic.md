PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and the types can you give me the following tables. 
1. properties (columns: name, default-value, type, description) 
2. events (columns: name - ex: 'click', type - ex: CustomEvent<ClickEvent>, description - when its being triggered etc) 
3.public functions (columns: name, arguments - ex: arg1:CustomType, arg2?: boolean = true, arg3?: string, description - breif explenation what it does)

## SOURCE-CODE:
 // utils 
import { property } from "@circular-tools/utils";

// templates
import { ColorTemplate } from "@circular-templates/color";

// local 
import { style } from "./style";
import { Elevation, Radius } from "./types";

export class BoxTemplate extends ColorTemplate {
    static style = style;

    @property() radius: Radius = "circular";
    @property() elevation: Elevation = "none";

    render() {
        return `
            <slot></slot>
        `
    }
}

## TYPE-CODE: // NOTE these are just for example purposes
export type Elevation = "none"|"small"|"medium"|"large";
export type Radius = 'none' | 'small' | 'medium' | 'large' | 'circular';
