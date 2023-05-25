// utils 
import { html, property } from "@circular-tools/utils";

// templates
import { BaseTemplate } from "@circular-templates/base";

// atoms 
import "@circular/icon/wc";

export type AtomicType = "atoms"|"molecules"|"organisms"|"templates";

import { style } from "./style.js";

export class AtomicChip extends BaseTemplate {
    static style = style;

    @property() type: AtomicType = "atoms";

    render() {
        return html`
            <o-icon size="30" name=${this.type}></o-icon>
            ${this.type}
        `
    }
}