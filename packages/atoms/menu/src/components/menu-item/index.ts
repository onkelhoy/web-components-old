// utils 
import { html, property, ExtractSlotValue } from "@papit/tools-utils";

// templates
import { BaseTemplate } from "@papit/templates-base";
import "@papit/templates-box/wc";

import { style } from "./style";

export class MenuItem extends BaseTemplate {
  static style = style;

  @property({ type: Boolean, rerender: false }) checked = false;
  @property({ attribute: false, rerender: false }) value = "";
  private slottext = "";

  public getvalue () {
    return this.value || this.slottext;
  }
  public gettext () {
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
  private handleslotchange = (e:Event) => {
    if (e.target instanceof HTMLSlotElement)
    {
      const values = ExtractSlotValue(e.target);
      this.slottext = values.join(' ');
    }
  }

  render() {
    return html`
      <div>
        <pap-icon name="check" slot="prefix"></pap-icon>
        <slot @slotchange="${this.handleslotchange}"></slot>
      </div>
    `
  }
}