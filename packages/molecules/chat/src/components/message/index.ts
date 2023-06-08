// utils 
import { html, property } from "@circular-tools/utils";

// templates
import { BoxTemplate } from "@circular-templates/box";

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