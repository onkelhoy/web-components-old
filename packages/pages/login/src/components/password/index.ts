// utils 
import { html, property, query } from "@pap-it/system-utils";
import { Translator } from "@pap-it/tools-translator";
import "@pap-it/tools-translator/wc";

// atoms 
import { Input } from "@pap-it/input";
import "@pap-it/input/wc";
import "@pap-it/icon/wc";
import "@pap-it/button/wc";
import "@pap-it/typography/wc";

import { style } from "./style";

export class Password extends Translator {
  static style = style;

  @property({ rerender: false, type: Boolean }) eye = false;
  @property() label = "Your password";
  @property() placeholder = "Type here";

  @query('pap-input') inputElement!: Input;

  // event handlers 
  private handleeyeclick = () => {
    this.eye = !this.eye;
    this.inputElement.inputElement.type = this.eye ? "text" : "password"
  }

  render() {
    return html`
      <pap-input 
        size="medium" 
        type="password"
        name="password"
        minLength="8"
        placeholder="${this.translateKey(this.placeholder)}"
      >
        <label slot="header">
          <pap-icon container="medium" name="key">PW</pap-icon>
          <pap-typography><pap-translator>${this.label}</pap-translator></pap-typography>
        </label>
        <pap-button variant="clear" slot="suffix" @click="${this.handleeyeclick}">
          <pap-icon container="medium" name="eye">show</pap-icon>
          <pap-icon container="medium" name="eye-close">hide</pap-icon>
        </pap-button>
      </pap-input>
    `
  }
}