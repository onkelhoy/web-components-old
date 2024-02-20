PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and the types can you give me the following tables.

1. properties (columns: name, default-value, type, description)
2. events (columns: name - ex: 'click', type - ex: CustomEvent<ClickEvent>, description - when its being triggered etc)
3.public functions (columns: name, arguments - ex: arg1:CustomType, arg2?: boolean = true, arg3?: string, description - breif explenation what it does)

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

## TYPE-CODE: export type Step = {

  id: number;
  text: string;
}
