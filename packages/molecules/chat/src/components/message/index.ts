// utils 
import { html, property } from "@henry2/tools-utils";

// templates
import { BoxTemplate } from "@henry2/templates-box";

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
        "o-chat-message": Message;
    }
}