PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and style code probided. Can you create a documentation that includes titles, short descrition and the table for each tables: css-variables, parts, slots.
css-variables should be a table with columns: (name, default-value, type - ex. CSS unit, description).
parts should include all elements that have been exposed with the part attribute ex: <p part='foo'> - and the table should then include columns: (name, description (short)).
slots should include columns: (name, default-value, description)

## SOURCE-CODE:
// utils 
import { html, property } from "@pap-it/system-utils";
import "@pap-it/tools-translator/wc";

// atoms 
import "@pap-it/button/wc";
import "@pap-it/icon/wc";
import "@pap-it/input/wc";

// templates
import { BaseSystem } from "@pap-it/system-base";

// local 
import { style } from "./style";

export class Chat extends BaseSystem {
  static style = style;

  // event handlers
  private handlesmileyclick = () => {
    console.log('open smileys')
  }
  private handlesendclick = () => {
    console.log('send')
  }

  render() {
    return html`
            <main></main>

            
            <pap-input size="medium">
                <div class="button-group" slot="suffix">
                    <pap-button radius="none" @click="${this.handlesmileyclick}" variant="clear">
                        <pap-icon customSize="20" name="smileys_emotion">smiley</pap-icon>
                    </pap-button>
                    <pap-button variant="clear" @click="${this.handlesendclick}" radius="none">
                        <pap-icon customSize="23" name="send">send</pap-icon>
                    </pap-button>
                </div>
            </pap-input>
        `
  }
}


declare global {
  interface HTMLElementTagNameMap {
    "pap-chat": Chat;
  }
}
## STYLE-CODE:
:host {
    --button-background-color-clear-hover: var(--smiley-hover-background, rgba(0, 0, 0, 0.05));

    .button-group {
        display: flex;

        pap-button {
            padding: 0.4rem;
            gap: 0;
        }
    }
}
