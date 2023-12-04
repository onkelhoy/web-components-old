// utils 
import { html, property, ExtractSlotValue } from "@pap-it/system-utils";

// templates
import { BaseSystem } from "@pap-it/system-base";
import "@pap-it/templates-prefix-suffix/wc";

import { style } from "./style";

export class MenuItem extends BaseSystem {
  static style = style;

  @property({ type: Boolean, rerender: false }) checked = false;
  @property({ attribute: false, rerender: false }) value = "";
  private slottext = "";

  public getvalue() {
    return this.value || this.slottext;
  }
  public gettext() {
    return this.slottext;
  }

  constructor() {
    super();
    this.addEventListener('click', this.handleclick);
  }

  // event handlers
  private handleclick = () => {
    this.checked = true; // can only select
    this.dispatchEvent(new Event("select"))
  }
  private handleslotchange = (e: Event) => {
    if (e.target instanceof HTMLSlotElement) {
      const values = ExtractSlotValue(e.target);
      this.slottext = values.join(' ');
    }
  }

  render() {
    return html`
      <pap-prefix-suffix-template part="prefix-suffix">
        <slot slot="prefix" name="prefix"><pap-icon name="check"></pap-icon></slot>
        <slot @slotchange="${this.handleslotchange}"></slot>
        <slot slot="suffix" name="suffix"></slot>
      </pap-prefix-suffix-template>
    `
  }
}