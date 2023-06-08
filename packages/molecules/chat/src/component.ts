// utils 
import { html, property } from "@circular-tools/utils";
import "@circular-tools/translator/wc";

// atoms 
import "@circular/button/wc";
import "@circular/icon/wc";
import "@circular/input/wc";

// templates
import { BaseTemplate } from "@circular-templates/base";

// local 
import { style } from "./style";

export class Chat extends BaseTemplate {
    static style = style;

    // event handlers

    render() {
        return html`
            <main></main>

            <o-input>
                <span slot="suffix">
                    <o-button>
                        <o-icon name="send">send</o-icon>
                    </o-button>
                </span>
            </o-input>
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "o-chat": Chat;
    }
}