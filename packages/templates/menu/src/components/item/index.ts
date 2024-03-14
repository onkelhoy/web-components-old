// system 
import { ExtractSlotValue, Radius, Size, html, property, query } from "@pap-it/system-utils";

// atoms
import "@pap-it/divider/wc";
import "@pap-it/typography/wc";

// templates
import { Box } from "@pap-it/templates-box";
import "@pap-it/templates-prefix-suffix/wc";

// local
import { style } from "./style";
import { MenuTemplate } from "../../component";
import { PrefixSuffixRender } from "./types";

export class ItemTemplate extends Box {
  static styles = [style];

  @property() size: Size = "medium";
  @property({ type: Boolean }) divider: boolean = false;
  @property({ type: Boolean }) selected: boolean = false;
  @property() value: string = "";
  @property() radius: Radius = "small";

  connectedCallback() {
    super.connectedCallback();
    this.role = "option";
  }
  firstUpdate(): void {
    super.firstUpdate();
    if (!this.hasAttribute("tabindex")) this.tabIndex = 0;
  }
  private text?: string;

  // public functions
  public init(menu: MenuTemplate) {
    menu.addEventListener('select', this.handlemenuselect);
    menu.addEventListener('pre-select', this.handlemenupreselect);

    for (let value in menu.selected) {
      if (this.getValue() === value) {
        this.dispatchEvent(new Event('click'));
        break;
      }
    }
  }
  public getValue() {
    return this.value || this.text || "missing-value";
  }
  public getText() {
    return this.text || this.value || "missing-text";
  }
  // dont know what value toggle adds 
  public toggle() {
    this.selected = !this.selected;
    if (this.selected) {
      this.dispatchEvent(new Event('select'));
      return true;
    }

    return false;
  }

  // event handler
  private handlemenuselect = (e: Event) => {
    if (e instanceof CustomEvent && e.target) {
      const menu = e.target as MenuTemplate;
      if (menu && 'value' in menu || 'multiple' in menu) {
        if (!menu.multiple && e.detail.value !== this.getValue()) {
          this.selected = false;
        }
      }
    }
  }
  private handlemenupreselect = (e: Event) => {
    if (e instanceof CustomEvent && e.detail.values) {
      if (e.detail.values.some((v: string) => v === this.getValue())) {
        this.dispatchEvent(new Event('click'));
      }
    }
  }
  private handleslotchange = (e: Event) => {
    if (e.target instanceof HTMLSlotElement) {
      const values = ExtractSlotValue(e.target);
      this.text = values.join(' ');
    }
  }

  override render(render?: PrefixSuffixRender) {
    return html`
      <pap-box-template 
        part="box"
        radius="${this.radius}" 
        elevation="${this.elevation}"
        elevation-direction="${this.elevationdirection}"
      >
        <pap-prefix-suffix-template part="prefix-suffix">
          <slot name="prefix" slot="prefix"></slot>
          ${render?.prefix}
          <pap-typography truncate="true" nowrap="true"><slot @slotchange="${this.handleslotchange}">${this.getText()}</slot></pap-typography>
          ${render?.content}
          <slot name="suffix" slot="suffix"></slot>
          ${render?.suffix}
        </pap-prefix-suffix-template>
      </pap-box-template>
      ${this.divider ? '<pap-divider part="divider"></pap-divider>' : ''}
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pap-item-template": ItemTemplate;
  }
}