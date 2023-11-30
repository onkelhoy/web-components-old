PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and register code provided to you - could you create a rather simple introduction text with maybe a code example how to use in html - keep it very simple. Do not give example how to run the register code it's already included (this is for you so you can see the element-tag)! The introduction should be read by developers so it needs not to be simple enough for beginners!

## SOURCE-CODE:
// utils 
import { html, property, FormatNumber } from "@pap-it/system-utils";

// atoms
import "@pap-it/typography/wc"

// templates
import { BaseSystem } from "@pap-it/system-base";
import "@pap-it/templates-box/wc"

// local 
import { style } from './style';

export class Badge extends BaseSystem {
  static style = style;

  @property({ type: Number }) count: number = 0;

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
## REGISTER-CODE:
import { Badge } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('pap-badge')) {
  cElements.define('pap-badge', Badge);
}
