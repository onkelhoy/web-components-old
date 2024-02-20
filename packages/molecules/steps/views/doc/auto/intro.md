PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and register code provided to you - could you create a rather simple introduction text with maybe a code example how to use in html - keep it very simple. Do not give example how to run the register code it's already included (this is for you so you can see the element-tag)! The introduction should be read by developers so it needs not to be simple enough for beginners!

## SOURCE-CODE

// system
import { html, property } from "@pap-it/system-utils";

// atoms
import "@pap-it/typography/wc";

// templates
import { Base } from "@pap-it/system-base";
import "@pap-it/templates-box/wc";

// local
import { style } from "./style";

export class Steps extends Base {
  static style = style;

  @property({ type: Array }) steps: string[] = [];

  @property({ type: Number }) current = 0;

  render() {
    return html`
            <pap-box-template radius="medium">
                ${this.steps.map((step, index) => {
      let status = "incomplete";
      if (this.current === index) status = 'active';
      else if (this.current > index) status = "complete";

      return html`
                        <div class="step ${this.current > index ? 'selected' : ''}">
                            <pap-typography align="center">${step}</pap-typography>
                            <div>
                                <pap-circle status="${status}"></pap-circle>
                                <span></span>
                            </div>
                        </div>
                    `
    })}
            </pap-box-template>
        `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pap-steps": Steps;
  }
}

## REGISTER-CODE

import { Circle } from './components/circle';
import { Steps } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('pap-steps')) {
  cElements.define('pap-steps', Steps);
}
if (!cElements.get('pap-circle')) {
  cElements.define('pap-circle', Circle);
}
