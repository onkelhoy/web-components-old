// utils
import { ExtractSlotValue, html, property } from "@pap-it/system-utils";

// templates
import { Field } from "@pap-it/templates-field";

// local
import { style } from "./style";

export class Checkbox extends Field {
  static style = style;

  @property({ rerender: false, onUpdate: "checkboxColorUpdate" }) color: string = "blue";

  constructor() {
    super();

    this.addEventListener("click", this.handleclick, true);
  }

  // update functions
  private checkboxColorUpdate = () => {
    if (this.inputElement) {
      this.inputElement.style.accentColor = this.color;
    }
  }
  private handleclick = (e: Event) => {
    e.stopPropagation();
    this.checked = !this.checked;
  }
  private handleslotchange = (e: Event) => {
    if (e.target instanceof HTMLSlotElement) {
      // console.log('slot chanfed', e.target.assignedNodes());
      const extractedtexts = ExtractSlotValue(e.target);

      this.label = extractedtexts.join(' ');
    }
  }

  render() {
    return super.render(html`
      <input readonly type="checkbox" />
      <slot style="display:none" @slotchange="${this.handleslotchange}"></slot>
    `)
  }
}


declare global {
  interface HTMLElementTagNameMap {
    "pap-checkbox": Checkbox;
  }
}