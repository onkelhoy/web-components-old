PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and style code probided. Can you create a documentation that includes titles, short descrition and the table for each tables: css-variables, parts, slots.
css-variables should be a table with columns: (name, default-value, type - ex. CSS unit, description).
parts should include all elements that have been exposed with the part attribute ex: <p part='foo'> - and the table should then include columns: (name, description (short)).
slots should include columns: (name, default-value, description)

## SOURCE-CODE:
// utils 
import { html, property } from "@henry2/tools-utils";
import "@henry2/tools-translator/wc";

// atoms 
import "@henry2/button/wc";
import "@henry2/icon/wc";
import "@henry2/input/wc";

// templates
import { BaseTemplate } from "@henry2/templates-base";

// local 
import { style } from "./style";

export class Chat extends BaseTemplate {
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

            
            <o-input size="medium">
                <div class="button-group" slot="suffix">
                    <o-button radius="none" @click="${this.handlesmileyclick}" variant="clear">
                        <o-icon customSize="20" name="smileys_emotion">smiley</o-icon>
                    </o-button>
                    <o-button variant="clear" @click="${this.handlesendclick}" radius="none">
                        <o-icon customSize="23" name="send">send</o-icon>
                    </o-button>
                </div>
            </o-input>
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "o-chat": Chat;
    }
}
## STYLE-CODE:
:host {
    --button-background-color-clear-hover: var(--smiley-hover-backgroun, rgba(0, 0, 0, 0.05));

    .button-group {
        display: flex;

        o-button {
            padding: 0.4rem;
            gap: 0;
        }
    }
}
