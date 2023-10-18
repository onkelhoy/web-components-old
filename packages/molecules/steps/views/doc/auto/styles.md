PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and style code probided. Can you create a documentation that includes titles, short descrition and the table for each tables: css-variables, parts, slots.
css-variables should be a table with columns: (name, default-value, type - ex. CSS unit, description).
parts should include all elements that have been exposed with the part attribute ex: <p part='foo'> - and the table should then include columns: (name, description (short)).
slots should include columns: (name, default-value, description)

## SOURCE-CODE:
// utils 
import { html, property } from "@pap-it/system-utils";

// atoms
import "@pap-it/typography/wc";

// templates
import { BaseSystem } from "@pap-it/system-base";
import "@pap-it/templates-box/wc";

// local 
import { style } from "./style";

export class Steps extends BaseSystem {
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
## STYLE-CODE:
:host {
    display: inline-block;
    --border-color-unselected: var(--pap-steps-border-color-unselected, var(--pap-color-bg-canvas, #EAEBEF));
    --border-color-selected: var(--pap-steps-border-color-selected, var(--pap-color-clear-blue-800, #0059E6));
    --pap-steps-circle-selected-color: var(--border-color-selected);
    --pap-steps-circle-stale-color: var(--border-color-unselected);

    pap-typography {
        padding-block: var(--padding-small, 8px);
    }

    pap-box-template {
        display: inline-flex;
        align-items: center;
        gap: var(--unit-size5, 32px);
        justify-content: space-between;

        background-color: var(--pap-color-bg, #FFFFFF);
        padding: var(--padding-medium, 16px) var(--padding-large, 24px);
        
        div {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;

            pap-typography {
                white-space:nowrap;
            }
            span {
                display: block;
                position: absolute;
                top: 50%;
                left: 0;
                content: '';
                width: calc(100% + var(--unit-size5, 32px));
                height: 2px;

                &::before,
                &::after {
                    content: '';
                    display: block;
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 100%;
                    background-color: var(--border-color-unselected);
                    transform: translateY(-50%);
                }

                &::before {
                    width: calc(50% - var(--unit-size4, 24px));
                }
                &::after {
                    left: calc(50% - var(--unit-size2, 8px));
                    width: calc(50% + var(--unit-size4, 24px));
                }
            }
        }
        div.step.selected > div > span::before,
        div.step.selected > div > span::after,
        div.step.selected + div.step > div > span::before {
            background-color: var(--border-color-selected);
        }
        div.step:first-child > div > span::before {
            display: none;
        }
        div.step:last-child > div > span::after {
            display: none;
        }
    }
}