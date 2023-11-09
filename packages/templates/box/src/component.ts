// utils 
import { property, Radius } from "@henry2/tools-utils";

// templates
import { BaseTemplate, RenderType } from "@henry2/templates-base";

// local 
import { style } from "./style";
import { Elevation } from "./types";

export class BoxTemplate extends BaseTemplate {
    static styles = [style];

    @property({ rerender: false }) radius: Radius = "circular";
    @property({ rerender: false }) elevation: Elevation = "none";
    @property({ rerender: false, attribute: 'elevation-direction' }) elevationdirection: 'vertical'|'horizontal' = "vertical";

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