// utils 
import { ExtractSlotValue, FormatNumber, html, property, query } from "@pap-it/system-utils";
import "@pap-it/tools-translator/wc";

// atoms 
import { Accordion } from "@pap-it/accordion";
import "@pap-it/button/wc";
import "@pap-it/icon/wc";
import "@pap-it/divider/wc";
import "@pap-it/badge/wc";
import "@pap-it/typography/wc";
import "@pap-it/accordion/wc";

// templates
import { BaseSystem } from "@pap-it/system-base";
import '@pap-it/templates-box/wc'

import { style } from "./style";

export type ChildSelectEvent = Item;

export class Item extends BaseSystem {
  static style = style;

  @property() icon?: string;
  @property() icon_selected?: string;
  @property() text: string = "";
  @property({ type: Number }) counter?: number;
  @property({ type: Boolean }) isparent: boolean = false;
  @property({ type: Boolean }) indicator: boolean = false;
  @property({ type: Boolean }) static: boolean = false;
  @property({ rerender: false, type: Boolean, onUpdate: "onaccordionopenupdate" }) open: boolean = true;

  // elements 
  @query('pap-accordion') accordionElement!: Accordion;

  private subitems: Array<Item> = [];
  private currentsubitemselected = 0;

  // on updates
  public onaccordionopenupdate = () => {
    if (this.accordionElement) {
      this.accordionElement.open = this.open;
    }
    else {
      return 10;
    }
  }

  // public functions
  public deselect() {
    this.classList.remove('selected');
    this.subitems.forEach(elm => elm.deselect());
  }

  // event handlers 
  private handleslotchange = (e: Event) => {
    if (e.target instanceof HTMLSlotElement) {
      const elements = e.target.assignedElements();
      elements.forEach(element => {
        if (element instanceof Item) {
          if (!element.hasAttribute('sidebar-subitem')) {
            if (!this.isparent) {
              this.isparent = true;
            }

            element.setAttribute('subitem-index', this.subitems.length.toString());
            this.subitems.push(element);
            element.addEventListener('reached-max', this.handlereachedmax);
            element.addEventListener('child-select', this.hanlechildselect);

            const depthlevel = Number(this.getAttribute('sidebar-subitem') || 0);
            element.style.setProperty("--padding-left", `calc(${depthlevel} * var(--gap-small, 8px))`);
            element.setAttribute('sidebar-subitem', depthlevel.toString());
          }
        }
      })
    }
  }
  // if we reached the current max of our subitems we tell our parents so it can progress further with clicking
  private handlereachedmax = () => {
    this.currentsubitemselected++;

    if (this.currentsubitemselected >= this.subitems.length) {
      this.currentsubitemselected = 0;
      this.dispatchEvent(new Event('reached-max'));
    }
  }
  public handleclick = () => {
    if (this.static) return;
    if (this.isparent) {
      if (this.getBoundingClientRect().width < 100) { // start selecting the subitems
        const savedcurrent = this.currentsubitemselected;
        this.subitems[this.currentsubitemselected]?.handleclick();

        // make sure we click through all children
        // we make sure to only call if same value (since there could be a update inbetween line 94 and this)
        if (this.currentsubitemselected == savedcurrent && !this.subitems[this.currentsubitemselected].isparent) {
          this.currentsubitemselected++;
          if (this.currentsubitemselected >= this.subitems.length) {
            this.currentsubitemselected = 0;
            this.dispatchEvent(new Event('reached-max'));
          }
        }
      }
      else {
        this.open = !this.open;
      }
    }
    else {
      if (this.hasAttribute('sidebar-subitem')) {
        this.dispatchEvent(new CustomEvent<ChildSelectEvent>('child-select', { detail: this }));
      }
      this.dispatchEvent(new Event('select'));
      this.classList.add('selected');
    }
  }
  private hanlechildselect = (e: Event) => {
    let currentstring: null | string = null;
    if (e.target instanceof Item) {
      currentstring = e.target.getAttribute('subitem-index');
      this.currentsubitemselected = Number(currentstring);
    }

    this.subitems.forEach(element => {
      if (element.getAttribute('subitem-index') !== currentstring) {
        element.deselect();
      }
    })

    if (e instanceof CustomEvent) {
      this.dispatchEvent(new CustomEvent<ChildSelectEvent>('child-select', { detail: e.detail }));

      if (!this.hasAttribute('sidebar-subitem') && !this.classList.contains("selected")) {
        this.classList.add('selected');
      }
    }
  }

  render() {
    const fallback = this.text ? this.text.substring(0, 2).toUpperCase() : '';
    const icon = this.icon || "";
    const icon_selected = this.icon_selected || icon;

    return html`
      <div>
        <pap-button 
          variant="clear" 
          color="secondary" 
          part="button" 
          @click="${this.handleclick}" 
          mode="fill" 
          textVariant="B1"
          size="${this.isparent ? "small" : "medium"}"
          radius="circular"
          class="${this.className}"
        >
          <span class="indicator" slot="prefix"></span>
          <span class="caret" slot="prefix"><pap-icon customsize="10" name="caret"></pap-icon></span>

          <span class="group">
            ${icon ? html`<pap-icon size="small" class="unselected" name="${icon}">${fallback}</pap-icon>` : ''}
            ${icon_selected ? html`<pap-icon size="small" class="selected" name="${icon_selected}">${fallback}</pap-icon>` : ''}
            <pap-typography truncate="true" variant="${this.isparent ? "C4" : "C3"}">${this.text}</pap-typography>
          </span>
          ${this.counter !== undefined ? html`<pap-badge mode="inactive" slot="suffix" count="${this.counter}"></pap-badge>` : ''}
        </pap-button>
        ${this.isparent ? '<pap-divider></pap-divider>' : ''}
      </div>
      <pap-accordion class="sub">
        <slot @slotchange="${this.handleslotchange}"></slot>
      </pap-accordion>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pap-sidebar-item": Item;
  }
}