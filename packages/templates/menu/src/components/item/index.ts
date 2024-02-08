// system 
import { ExtractSlotValue, Size, html, property, query } from "@pap-it/system-utils";

// atoms
import "@pap-it/divider/wc";
import "@pap-it/typography/wc";

// templates
import { Box } from "@pap-it/templates-box";
import "@pap-it/templates-prefix-suffix/wc";

// local
import { style } from "./style";
import { Menu } from "../../component";

export interface Item extends Omit<HTMLInputElement, 'size' | 'addEventListener' | 'removeEventListener' | 'querySelector'> {

}
export class Item extends Box {
  static styles = [style];

  @property() size: Size = "medium";
  @property({ rerender: false, type: Number }) tabIndex: number = 1;
  @property({ type: Boolean }) divider: boolean = false;
  @property() value: string = "";

  constructor() {
    super();
    this.radius = "medium";
    this.role = "option";
  }
  private text?: string;

  // public functions
  public init(menu: Menu) {
    menu.addEventListener('select', this.handlemenuselect);
  }
  public getValue() {
    return this.value || this.text || "missing-value";
  }
  public getText() {
    return this.text || this.value || "missing-text";
  }
  public toggle() {
    this.classList.toggle('selected');
    if (this.classList.contains("selected")) {
      this.dispatchEvent(new Event('select'));
      return true;
    }

    return false;
  }

  // event handler
  private handlemenuselect = (e: Event) => {
    if (e instanceof CustomEvent && e.target) {
      const menu = e.target as Item;
      if (menu && 'value' in menu || 'multiple' in menu) {
        if (!menu.multiple && e.detail.value !== this.getValue()) {
          this.classList.remove('selected');
        }
      }
    }
  }
  private handleslotchange = (e: Event) => {
    if (e.target instanceof HTMLSlotElement) {
      const values = ExtractSlotValue(e.target);
      this.text = values.join(' ');
    }
  }

  render() {
    return html`
      <pap-box-template 
        radius="${this.radius}" 
        elevation="${this.elevation}"
        elevation-direction="${this.elevationdirection}"
      >
        <pap-prefix-suffix-template>
          <slot name="prefix" slot="prefix"></slot>
          <pap-typography truncate="true" nowrap="true"><slot @slotchange="${this.handleslotchange}">${this.getText()}</slot></pap-typography>
          <slot name="suffix" slot="suffix"></slot>
        </pap-prefix-suffix-template>
      </pap-box-template>
      ${this.divider ? '<pap-divider part="divider"></pap-divider>' : ''}
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pap-item-template": Item;
  }
}