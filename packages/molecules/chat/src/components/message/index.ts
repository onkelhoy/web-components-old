// utils 
import { html, property } from "@onkelhoy/tools-utils";

// templates
import { BoxTemplate } from "@onkelhoy/templates-box";

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