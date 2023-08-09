// utils 
import { html, property, query } from "@henry2/tools-utils";
import { Translator } from "@henry2/tools-translator";
import "@henry2/tools-translator/wc";

// atoms 
import { Input } from "@henry2/input";
import "@henry2/input/wc";
import "@henry2/icon/wc";
import "@henry2/button/wc";
import "@henry2/typography/wc";

import { style } from "./style";

export class Password extends Translator {
  static style = style;

  @property({ rerender: false, type: Boolean }) eye = false;
  @property() label = "Your password";
  @property() placeholder = "Type here";

  @query('o-input') inputElement!: Input;

  // event handlers 
  private handleeyeclick = () => {
    this.eye = !this.eye;
    this.inputElement.inputElement.type = this.eye ? "text" : "password"
  }

  render() {
    return html`
      <o-input 
        size="medium" 
        type="password"
        name="password"
        minLength="8"
        placeholder="${this.translateKey(this.placeholder)}"
      >
        <label slot="header">
          <o-icon container="medium" name="key">PW</o-icon>
          <o-typography><o-translator>${this.label}</o-translator></o-typography>
        </label>
        <o-button variant="clear" slot="suffix" @click="${this.handleeyeclick}">
          <o-icon container="medium" name="eye">show</o-icon>
          <o-icon container="medium" name="eye-close">hide</o-icon>
        </o-button>
      </o-input>
    `
  }
}