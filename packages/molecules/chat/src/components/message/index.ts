// utils 
import { html, property } from "@papit/tools-utils";

// templates
import { BoxTemplate } from "@papit/templates-box";

// local 
import { style } from "./style";

export class Message extends BoxTemplate  {
    static style = style;

    // event handlers

    override render() {
        return html`
            
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "pap-chat-message": Message;
    }
}