// utils 
import { html, property, FormatNumber } from "@henry2/tools-utils";

// atoms
import "@henry2/typography/wc"

// templates
import { BaseTemplate } from "@henry2/templates-base";
import "@henry2/templates-box/wc"

// local 
import { style } from './style';

export class Badge extends BaseTemplate {
    static style = style;

    @property({ type: Number}) count: number = 0;

    render() {
        return html`
            <o-box-template part="box" radius="circular">
                <o-typography variant="C4"><slot>${FormatNumber(this.count)}</slot></o-typography>
            </o-box-template>
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "o-badge": Badge;
    }
}