// utils 
import { html, property, Size, Radius, query } from "@pap-it/system-utils";

// atoms
import { ButtonVariant, ButtonColorVariant } from "@pap-it/button";
import "@pap-it/icon/wc";
import "@pap-it/button/wc";

// templates
import { Base } from "@pap-it/system-base";
import { Placement } from "@pap-it/templates-popover";
import { Popover } from "@pap-it/templates-popover";
import "@pap-it/templates-popover/wc";
import "@pap-it/templates-box/wc";

// local 
import { style } from "./style";
import { MenuItem } from "./components/menu-item";

export class Menu extends Base {
  static style = style;

  @query('pap-popover-template') popoverTemplate!: Popover;

  @property({ rerender: false, type: Boolean }) open: boolean = false;
  @property() placement: Placement = "bottom-center";
  @property() size: Size = "medium";
  @property({ attribute: 'close-on-select', type: Boolean }) closeonselect: boolean = false;

  @property() buttonVariant: ButtonVariant = "clear";
  @property() buttonColor: ButtonColorVariant = "secondary";
  @property() buttonRadius: Radius = "medium";

  private current?: MenuItem;
  private items: MenuItem[] = [];

  // public functions
  // NOTE problem with value as I need to access it via attributes...
  public get value() {
    return this.current?.getvalue() || '';
  }
  public set value(value: string) {
    const item = this.items.find(i => i.getvalue() === value);
    if (item) {
      item.click();
    }
  }
  public get text() {
    return this.current?.gettext();
  }

  // event handlers
  private handleslotchange = (e: Event) => {
    if (e.target instanceof HTMLSlotElement) {
      const items = e.target.assignedElements();
      items.forEach(item => {
        if (item instanceof MenuItem) {
          if (!item.hasAttribute('data-menu-init')) {
            item.addEventListener('select', this.handleitemselected);
            item.setAttribute('data-menu-init', 'true');
            this.items.push(item);
          }
        }
      })
    }
  }
  private handleitemselected = (e: Event) => {
    if (e.target instanceof MenuItem) {
      if (this.current && e.target !== this.current) {
        this.current.checked = false;
      }
      this.current = e.target;
      this.dispatchEvent(new Event('select'));
    }

    if (this.closeonselect) {
      this.popoverTemplate.hide();
    }
  }
  private handlehide = () => {
    this.open = false;
  }
  private handleshow = () => {
    this.open = true;
  }

  render() {
    return html`
      <pap-popover-template 
        @hide="${this.handlehide}" 
        @show="${this.handleshow}" 
        revealby="click" 
        hideonoutsideclick 
        placement="${this.placement}"
      >
        <span slot="target">
          <slot name="button">
            <pap-button 
              variant="${this.buttonVariant}" 
              color="${this.buttonColor}" 
              radius="${this.buttonRadius}" 
              part="button" 
              size="${this.size}"
            >
              <slot name="button-prefix" slot="prefix"></slot>
              <slot name="button-content"></slot>
              <slot name="button-suffix" slot="suffix">
                <pap-icon custom-size="15" name="caret">v</pap-icon>
              </slot>
            </pap-button>
          </slot>
        </span>
        <pap-box-template part="box" class="options" radius="small" elevation="small">
          <slot @slotchange="${this.handleslotchange}">
            <pap-menu-item>Missing Items</pap-menu-item>
          </slot>
        </pap-box-template>
      </pap-popover-template>
    `
  }
}


declare global {
  interface HTMLElementTagNameMap {
    "pap-menu": Menu;
  }
}