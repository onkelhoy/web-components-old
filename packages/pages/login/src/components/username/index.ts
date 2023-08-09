// utils 
import { html, property } from "@onkelhoy/tools-utils";
import { Translator } from "@onkelhoy/tools-translator";
import "@onkelhoy/tools-translator/wc";

// atoms 
import "@onkelhoy/input/wc";
import "@onkelhoy/icon/wc";
import "@onkelhoy/typography/wc";

import { style } from "./style";

export class Username extends Translator {
  static style = style;

  @property() label = "Your username";
  @property() placeholder = "Type here";

  render() {
    return html`
      <o-input 
        size="medium" 
        name="username"
        placeholder="${this.translateKey(this.placeholder)}"
      >
        <label slot="header">
          <o-icon container="medium" name="user">U</o-icon>
          <o-typography><o-translator>${this.label}</o-translator></o-typography>
        </label>
      </o-input>
    `
  }
}