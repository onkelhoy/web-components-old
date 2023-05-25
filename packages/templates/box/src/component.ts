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