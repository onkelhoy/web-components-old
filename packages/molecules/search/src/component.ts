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
import { Mode } from "./types";

export class Search extends Translator {
  static style = style;

  @query<Input>('pap-input') inputElement!: Input;
  @property({ type: Boolean, rerender: false }) toggled: boolean = false;
  @property() mode: Mode = "dynamic";

  public toggle = () => {
    this.toggled = !this.toggled;
    if (this.toggled) {
      setTimeout(() => {

        this.inputElement.focus();
      }, 10)
    }
  }

  public get value() {
    return this.inputElement.value;
  }

  // event handlers 
  private handlechange = (e: Event) => {
    this.dispatchEvent(new Event("change"));
  }
  private handleinputblur = () => {
    if (!this.inputElement.value) {
      this.toggled = false;
    }
  }

  render() {
    return html`
      <pap-button @click="${this.toggle}" circle="true" variant="clear" color="secondary" slot="suffix">
        <pap-icon name="search" cache="true"></pap-icon>
      </pap-button>
      <pap-input @blur="${this.handleinputblur}" clearable="true" @change="${this.handlechange}" radius="medium" placeholder="${this.translateKey("Search...")}">
        <pap-icon container="small" size="small" slot="prefix" name="search" cache="true"></pap-icon>
      </pap-input>
    `
  }
}


declare global {
  interface HTMLElementTagNameMap {
    "pap-search": Search;
  }
}