// utils 
import { html, property } from "@papit/tools-utils";
import "@papit/tools-translator/wc";

// atoms 
import "@papit/button/wc";
import "@papit/icon/wc";
import "@papit/input/wc";

// templates
import { BaseTemplate } from "@papit/templates-base";

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