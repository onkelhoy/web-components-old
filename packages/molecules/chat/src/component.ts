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