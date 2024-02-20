// system
import { html, property, query } from "@pap-it/system-utils";

// templates
import { Popover, PopoverProperties } from "@pap-it/templates-popover";
import "@pap-it/templates-popover/wc";
import "@pap-it/templates-box/wc";

// tools
import "@pap-it/tools-translator/wc";

// local 
import { style } from "./style";
import { Selected } from './types';
import { Item } from "./components/item";

export class Menu extends PopoverProperties {
  static style = style;

  @query('pap-popover-template') popoverTemplate!: Popover;
  @property({ type: Boolean }) multiple: boolean = false;
  @property({ type: Boolean, attribute: false }) protected hasitems: boolean = false;
  @property({
    rerender: false,
    attribute: 'menu-height',
    set: function (this: Menu, value: string) {
      this.style.setProperty('--menu-height', value);
      return value;
    }
  }) menuheight: string = "15rem";
  @property({ attribute: 'dynamic-width', type: Boolean, rerender: false }) dynamicwidth: boolean = true;

  public selected: Record<string, string> = {};

  constructor() {
    super();

    this.revealby = "click";
  }

  // event handlers
  private handleslotchange = (e: Event) => {
    if (e.target instanceof HTMLSlotElement) {
      this.hasitems = false;
      this.slotextraction(e.target);
    }
  }
  private slotextraction = (element: HTMLSlotElement) => {
    const elements = element.assignedElements();
    elements.forEach(element => {
      const item = this.isitem(element);
      if (item) {
        this.hasitems = true;
        if (!item.hasAttribute('data-menu-template-init')) {
          item.addEventListener('click', this.handleitemclick);
          item.setAttribute('data-menu-template-init', 'true');
          item.init(this);
        }
      }
      else if (element instanceof HTMLSlotElement) {
        if (!element.hasAttribute('data-menu-template-init')) {
          this.slotextraction(element);
          element.addEventListener('slotchange', this.handlenestedslotchange);
          element.setAttribute('data-menu-template-init', 'true');
        }
      }
      else {
        console.log('what are you?', element)
      }
    })
  }
  private isitem(potential: any): Item | null {
    if (potential instanceof Item || potential.role === 'option' && 'init' in potential) {
      return potential as Item;
    }

    return null;
  }
  private handlenestedslotchange = (e: Event) => {
    this.handleslotchange(e);
  }
  private handleitemclick = (e: Event) => {
    const item = this.isitem(e.target);
    if (item) {
      const text = item.getText();
      const value = item.getValue();

      if (item.toggle()) {
        if (!this.multiple) {
          this.selected = {};
        }

        this.selected[value] = text;
        this.dispatchEvent(new CustomEvent<Selected>('select', { detail: { value, text } }));
      }
      else {
        delete this.selected[value];
        this.dispatchEvent(new CustomEvent<Selected>('deselect', { detail: { value, text } }));
      }

    }
  }
  private handleshow = () => {
    this.open = true;
    this.dispatchEvent(new Event('show'));
  }
  private handlehide = () => {
    this.open = false;
    this.dispatchEvent(new Event('hide'));
  }

  render() {
    return html`
      <pap-popover-template 
        @show="${this.handleshow}"
        @hide="${this.handlehide}"
        revealby="${this.revealby}" 
        placement="${this.placement}"
        open="${this.open}"
        part="popover"
        hideonoutsideclick="${this.hideonoutsideclick}"
      >
        <span slot="target">
          <slot name="button">
            <p>fallback button</p>
          </slot>
        </span>
        <pap-box-template part="items" radius="medium" elevation="small">
          <slot @slotchange="${this.handleslotchange}"></slot>
          ${!this.hasitems ? `<pap-item-template>
            <pap-translator>Missing Items</pap-translator>
          </pap-item-template>` : ''}
        </pap-box-template>
      </pap-popover-template>
    `
  }
}


declare global {
  interface HTMLElementTagNameMap {
    "pap-menu-template": Menu;
  }
}