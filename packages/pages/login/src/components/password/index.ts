// utils 
import { html, property, query } from "@papit/tools-utils";
import { Translator } from "@papit/tools-translator";
import "@papit/tools-translator/wc";

// atoms 
import { Input } from "@papit/input";
import "@papit/input/wc";
import "@papit/icon/wc";
import "@papit/button/wc";
import "@papit/typography/wc";

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