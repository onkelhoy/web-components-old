// utils 
import { html, property } from "@onkelhoy/tools-utils";

// atoms
import "@onkelhoy/typography/wc";

// templates
import { BaseTemplate } from "@onkelhoy/templates-base";
import "@onkelhoy/templates-box/wc";

// local 
import { style } from "./style";

export class Steps extends BaseTemplate {
    static style = style;

    @property({ type: Array }) steps:string[] = [];

    @property({ type: Number }) current = 0;

    render() {
        return html`
            <o-box-template radius="medium">
                ${this.steps.map((step, index) => {
                    let status = "incomplete";
                    if (this.current === index) status = 'active';
                    else if (this.current > index) status="complete";

                    return html`
                        <div class="step ${this.current > index ? 'selected' : ''}">
                            <o-typography align="center">${step}</o-typography>
                            <div>
                                <o-circle status="${status}"></o-circle>
                                <span></span>
                            </div>
                        </div>
                    `
                })}
            </o-box-template>
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "o-steps": Steps;
    }
}