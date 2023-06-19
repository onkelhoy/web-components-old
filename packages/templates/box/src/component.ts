// utils 
import { property } from "@circular-tools/utils";

// templates
import { ColorTemplate } from "@circular-templates/color";

// local 
import { style } from "./style";
import { Elevation, Radius } from "./types";
import { RenderType } from "@circular-templates/base";

export class BoxTemplate extends ColorTemplate {
    static styles = [style];

    @property() radius: Radius = "circular";
    @property() elevation: Elevation = "none";

    render():RenderType {
        return `
            <slot></slot>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "o-box-template": BoxTemplate;
    }
}