PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and register code provided to you - could you create a rather simple introduction text with maybe a code example how to use in html - keep it very simple. Do not give example how to run the register code it's already included (this is for you so you can see the element-tag)! The introduction should be read by developers so it needs not to be simple enough for beginners!

## SOURCE-CODE:
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
## REGISTER-CODE:
import { Badge } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('o-badge')) {
  cElements.define('o-badge', Badge);
}
