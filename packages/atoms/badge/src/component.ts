// utils 
import { html, property, FormatNumber } from "@onkelhoy/tools-utils";

// atoms
import "@onkelhoy/typography/wc"

// templates
import { BaseTemplate } from "@onkelhoy/templates-base";
import "@onkelhoy/templates-box/wc"

// local 
import { style } from './style';

export class Badge extends BaseTemplate {
    static style = style;

    @property({ type: Number}) count: number = 0;

    render() {
        return html`
            <o-box-template radius="circular">
                <o-typography variant="C4">${FormatNumber(this.count)}</o-typography>
            </o-box-template>
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "o-badge": Badge;
    }
}