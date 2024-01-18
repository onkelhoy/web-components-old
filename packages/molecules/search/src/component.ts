// system
import { html, property, query } from "@pap-it/system-utils";

// atoms 
import { Input } from "@pap-it/input";
import "@pap-it/button/wc";
import "@pap-it/icon/wc";
import "@pap-it/input/wc";

// tools 
import { Translator } from "@pap-it/tools-translator";

// local 
import { style } from "./style";

export class Search extends Translator {
  static style = style;

  @query<Input>('pap-input') inputElement!: Input;
  @property({ type: Boolean, rerender: false }) toggled: boolean = false;

  public toggle = () => {
    this.toggled = !this.toggled;
  }

  public get value() {
    return this.inputElement.value;
  }

  // event handlers 
  private handleinput = (e: Event) => {
    this.dispatchEvent(new Event("change"));
  }

  render() {
    return html`
      <pap-button @click="${this.toggle}" circle="true" variant="clear" color="secondary" slot="suffix">
        <pap-icon name="search" cache="true"></pap-icon>
      </pap-button>
      <pap-input @debounced-input="${this.handleinput}" radius="medium" placeholder="${this.translateKey("Search...")}">
        <pap-icon container="small" size="small" slot="prefix" name="search" cache="true"></pap-icon>
        <pap-button size="small" @click="${this.toggle}" circle="true" variant="clear" color="secondary" slot="suffix">
          <pap-icon size="small" name="close" cache="true"></pap-icon>
        </pap-button>
      </pap-input>
    `
  }
}


declare global {
  interface HTMLElementTagNameMap {
    "pap-search": Search;
  }
}