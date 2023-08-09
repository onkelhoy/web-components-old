// utils 
import { html, property, query } from "@onkelhoy/tools-utils";
import { Translator } from "@onkelhoy/tools-translator";
import "@onkelhoy/tools-translator/wc";

// atoms 
import { Input } from "@onkelhoy/input";
import "@onkelhoy/input/wc";
import "@onkelhoy/icon/wc";
import "@onkelhoy/button/wc";
import "@onkelhoy/typography/wc";

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