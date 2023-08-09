// utils 
import { html, property } from "@henry2/tools-utils";
import { Translator } from "@henry2/tools-translator";
import "@henry2/tools-translator/wc";

// atoms 
import "@henry2/input/wc";
import "@henry2/icon/wc";
import "@henry2/typography/wc";

import { style } from "./style";

export class Email extends Translator {
  static style = style;

  @property() label = "Your email address";
  @property() placeholder = "Type here";

  render() {
    return html`
      <o-input 
        size="medium" 
        type="mail"
        name="email"
        placeholder="${this.translateKey(this.placeholder)}"
      >
        <label slot="header">
          <o-icon container="medium" name="mail">EM</o-icon>
          <o-typography><o-translator>${this.label}</o-translator></o-typography>
        </label>
      </o-input>
    `
  }
}