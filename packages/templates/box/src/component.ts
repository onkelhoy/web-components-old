// utils 
import { property } from "@circular-tools/utils";

// templates
import { BaseTemplate, RenderType } from "@circular-templates/base";

// local 
import { style } from "./style";
import { Elevation, Radius } from "./types";

export class BoxTemplate extends BaseTemplate {
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
        "o-box-template": BoxTemplate;
    }
}