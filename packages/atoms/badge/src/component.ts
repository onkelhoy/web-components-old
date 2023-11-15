// utils 
import { html, property, FormatNumber } from "@papit/tools-utils";

// atoms
import "@papit/typography/wc"

// templates
import { BaseTemplate } from "@papit/templates-base";
import "@papit/templates-box/wc"

// local 
import { style } from './style';

export class Badge extends BaseTemplate {
    static style = style;

    @property({ type: Number}) count: number = 0;

    render() {
        return html`
            <pap-box-template part="box" radius="circular">
                <pap-typography variant="C4"><slot>${FormatNumber(this.count)}</slot></pap-typography>
            </pap-box-template>
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "pap-badge": Badge;
    }
}