// utils 
import { html, property } from "@circular-tools/utils";

// templates
import { BaseTemplate } from "@circular-templates/base";

import { style } from "./style";

export type ChangeEvent = { value: boolean };

export class Radio extends BaseTemplate {
  static style = style;

  @property() left:string = "True";
  @property() right:string = "False";
  @property() label:string = "Label";
  @property() name: string = "";
  @property({ type: Boolean }) value:boolean = false;

  private handleclick = (e:Event) => {
    this.value = !this.value;
    this.dispatchEvent(new CustomEvent<ChangeEvent>("change", { detail: { value: this.value } } ));
  }

  render() {
    return html`
      <label>${this.label}</label>
      <div @click="${this.handleclick}">
        <div class="left">${this.left}</div>
        <div class="right">${this.right}</div>
      </div>
    `
  }
}