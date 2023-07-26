// utils 
import { html, property } from "@circular-tools/utils";
import { Translator } from "@circular-tools/translator";
import "@circular-tools/translator/wc";

// atoms 
import "@circular/input/wc";
import "@circular/icon/wc";
import "@circular/typography/wc";

import { style } from "./style";

export class Email extends Translator {
  static style = style;

  @property() label = "Your email address";
  @property() placeholder = "Type here";

  render() {
    return html`
      <o-input 
        size="large" 
        type="mail"
        placeholder="${this.translateKey(this.placeholder)}"
      >
        <label slot="label">
          <o-icon container="medium" name="mail">EM</o-icon>
          <o-typography><o-translator>${this.label}</o-translator></o-typography>
        </label>
      </o-input>
    `
  }
}