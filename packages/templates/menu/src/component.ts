// system
import { Size, html, property, query } from "@pap-it/system-utils";

// templates
import { RenderType } from "@pap-it/system-base";
import { Popover, PopoverProperties } from "@pap-it/templates-popover";
import "@pap-it/templates-popover/wc";
import "@pap-it/templates-box/wc";

// tools
import "@pap-it/tools-translator/wc";

// local 
import { style } from "./style";
import { Selected } from './types';
import { Item } from "./components/item";

export class MenuProperties extends PopoverProperties {
  @property({ type: Boolean }) multiple: boolean = false;
  @property({ type: Boolean, attribute: 'close-on-select', rerender: false }) closeonselect: boolean = false;
  @property({ attribute: 'dynamic-width', type: Boolean, rerender: false }) dynamicwidth: boolean = true;
  @property() size: Size = "medium";
  @property({
    rerender: false,
    attribute: 'menu-height',
    set: function (this: Menu, value: string) {
      this.style.setProperty('--menu-height', value);
      return value;
    }
  }) menuheight: string = "15rem";
}

export class Menu extends MenuProperties {
  static styles = [style];

  @query('pap-popover-template') popoverTemplate!: Popover;
  @property({ type: Boolean, attribute: false }) protected hasitems: boolean = false;

  public selected: Record<string, string> = {};
  public lastselected?: string;

  constructor() {
    super();

    this.revealby = "click";
  }

  // public function
  public select(value?: string) {
    if (!value) this.dispatchEvent(new CustomEvent('select', { detail: { value: undefined, text: undefined } }));
    else {
      this.dispatchEvent(new CustomEvent('pre-select', { detail: { value } }));
    }
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
          item.size = this.size; // let our size override the items size 
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
        this.lastselected = value;
        this.dispatchEvent(new CustomEvent<Selected>('select', { detail: { value, text } }));
      }
      else {
        delete this.selected[value];
        if (this.lastselected === value) this.lastselected = undefined;
        this.dispatchEvent(new CustomEvent<Selected>('deselect', { detail: { value, text } }));
      }

      if (this.closeonselect) {
        this.open = false;
      }
      this.dispatchEvent(new Event('change'));
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

  override render(buttonelement?: RenderType) {
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
            ${buttonelement ? buttonelement : '<p>fallback button</p>'}
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