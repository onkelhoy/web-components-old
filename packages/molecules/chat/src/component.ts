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