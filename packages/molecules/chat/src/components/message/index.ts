// system
import { html, property } from "@pap-it/system-utils";

// templates
import { Box } from "@pap-it/templates-box";

// local 
import { style } from "./style";

export class Message extends Box {
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