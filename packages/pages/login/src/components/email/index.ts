// system
import { html, property } from "@pap-it/system-utils";
import { Translator } from "@pap-it/tools-translator";
import "@pap-it/tools-translator/wc";

// atoms 
import "@pap-it/input/wc";
import "@pap-it/icon/wc";
import "@pap-it/typography/wc";

import { style } from "./style";

export class Email extends Translator {
  static style = style;

  @property() label = "Your email address";
  @property() placeholder = "Type here";

  render() {
    return html`
      <pap-input 
        size="medium" 
        type="mail"
        name="email"
        placeholder="${this.translateKey(this.placeholder)}"
      >
        <label slot="header">
          <pap-icon container="medium" name="mail">EM</pap-icon>
          <pap-typography><pap-translator>${this.label}</pap-translator></pap-typography>
        </label>
      </pap-input>
    `
  }
}