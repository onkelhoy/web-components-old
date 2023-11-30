// utils 
import { html, property, query } from "@pap-it/system-utils";

// atoms 
import { Input } from "@pap-it/input";
import { Typography } from "@pap-it/typography";
import "@pap-it/input/wc";
import "@pap-it/typography/wc";

// templates
import { BaseSystem } from "@pap-it/system-base";

import { style } from "./style";

export type CellMode = "edit" | "view";

export class Cell extends BaseSystem {
  static style = style;

  @property({ rerender: false }) value: string = "";
  @property({ rerender: false }) mode: CellMode = "view";
  @property({ type: Boolean, rerender: false }) allowEdit: boolean = false;
  @property({ type: Number, rerender: false }) tabIndex: number = 1;

  @query('pap-input') inputElement!: Input;
  @query('pap-typography') typographyElement!: Typography;

  constructor() {
    super();

    this.addEventListener('click', this.handleclick);
    this.addEventListener("blur", this.handleblur); // NOTE this should have been taken care by base...
    this.addEventListener('keyup', this.handlekeyup);
  }

  // event handlers 
  private handleclick = () => {
    if (this.allowEdit) {
      this.mode = "edit";
      this.inputElement.focus();
      this.inputElement.selectionStart = this.inputElement.value?.length || 0;
      this.inputElement.selectionEnd = this.inputElement.value?.length || 0;
    }
  }
  private handlekeyup = (e: KeyboardEvent) => {
    if (this.hasFocus && e.code === "Enter") {
      this.handleclick();
    }
  }
  protected handleblur = () => {
    if (this.mode === "edit") {
      const { value } = this.inputElement;
      if (value) {
        if (this.value !== value) {
          this.typographyElement.innerText = value;
          this.value = value;
          this.dispatchEvent(new Event("change"));
        }
      }
      this.mode = "view";
    }
  };

  render() {
    return html`
      <pap-typography>${this.value}</pap-typography>
      <pap-input radius="none" size="large" value="${this.value}"></pap-input>
    `
  }
}