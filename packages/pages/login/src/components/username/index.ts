// utils 
import { html, property } from "@papit/tools-utils";
import { Translator } from "@papit/tools-translator";
import "@papit/tools-translator/wc";

// atoms 
import "@papit/input/wc";
import "@papit/icon/wc";
import "@papit/typography/wc";

import { style } from "./style";

export class Username extends Translator {
  static style = style;

  @property() label = "Your username";
  @property() placeholder = "Type here";

  render() {
    return html`
      <pap-input 
        size="medium" 
        name="username"
        placeholder="${this.translateKey(this.placeholder)}"
      >
        <label slot="header">
          <pap-icon container="medium" name="user">U</pap-icon>
          <pap-typography><pap-translator>${this.label}</pap-translator></pap-typography>
        </label>
      </pap-input>
    `
  }
}