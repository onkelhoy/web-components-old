// system
import { html, CustomElement } from "@pap-it/system-utils";

// local 
import { style } from "./style";
export class Editor extends CustomElement {
  static styles = [style]

  render() {
    return html`
      <header part="header">
        <slot name="header">
          <h1>llama drama trauma</h1>
        </slot>
      </header>
    `
  }
}


declare global {
  interface HTMLElementTagNameMap {
    "pap-editor": Editor;
  }
}