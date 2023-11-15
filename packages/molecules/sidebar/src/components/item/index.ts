// utils 
import { ExtractSlotValue, FormatNumber, html, property, query } from "@henry2/tools-utils";
import "@henry2/tools-translator/wc";

// atoms 
import { Accordion } from "@henry2/accordion";
import "@henry2/button/wc";
import "@henry2/icon/wc";
import "@henry2/divider/wc";
import "@henry2/badge/wc";
import "@henry2/typography/wc";
import "@henry2/accordion/wc";

// templates
import { BaseTemplate } from "@henry2/templates-base";
import '@henry2/templates-box/wc'

import { style } from "./style";

export type ChildSelectEvent = Item;

export class Item extends BaseTemplate {
  static style = style;

  @property() icon?:string;
  @property() icon_selected?:string;
  @property() text:string = "";
  @property({ type: Number }) counter?:number;
  @property({ type: Boolean }) isparent:boolean = false;
  @property({ type: Boolean }) indicator:boolean = false;
  @property({ type: Boolean }) static: boolean = false;
  @property({ rerender: false, type: Boolean, onUpdate: "onaccordionopenupdate" }) open:boolean = true;

  // elements 
  @query('o-accordion') accordionElement!: Accordion;

  private subitems: Array<Item> = [];
  private currentsubitemselected = 0;

  // on updates
  public onaccordionopenupdate = () => {
    if (this.accordionElement)
    {
      this.accordionElement.open = this.open;
    }
    else 
    {
      return 10;
    }
  }

  // public functions
  public deselect() {
    this.classList.remove('selected');
    this.subitems.forEach(elm => elm.deselect());
  }

  // event handlers 
  private handleslotchange = (e:Event) => {
    if (e.target instanceof HTMLSlotElement)
    {
      const elements = e.target.assignedElements();
      elements.forEach(element => {
        if (element instanceof Item)
        {
          if (!element.hasAttribute('sidebar-subitem')) 
          {
            if (!this.isparent) 
            {
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

    if (this.currentsubitemselected >= this.subitems.length)
    {
      this.currentsubitemselected = 0;
      this.dispatchEvent(new Event('reached-max'));
    }
  }
  public handleclick = () => {
    if (this.static) return;
    if (this.isparent)
    {
      if (this.getBoundingClientRect().width < 100)
      { // start selecting the subitems
        const savedcurrent = this.currentsubitemselected;
        this.subitems[this.currentsubitemselected]?.handleclick();

        // make sure we click through all children
        // we make sure to only call if same value (since there could be a update inbetween line 94 and this)
        if (this.currentsubitemselected == savedcurrent && !this.subitems[this.currentsubitemselected].isparent)
        {
          this.currentsubitemselected++;
          if (this.currentsubitemselected >= this.subitems.length)
          {
            this.currentsubitemselected = 0;
            this.dispatchEvent(new Event('reached-max'));
          }
        }
      }
      else 
      {
        this.open = !this.open;
      }
    }
    else 
    {
      if (this.hasAttribute('sidebar-subitem')) 
      {
        this.dispatchEvent(new CustomEvent<ChildSelectEvent>('child-select', { detail: this }));
      }
      this.dispatchEvent(new Event('select'));
      this.classList.add('selected');
    }
  }
  private hanlechildselect = (e:Event) => {
    let currentstring:null|string = null;
    if (e.target instanceof Item)
    {
      currentstring = e.target.getAttribute('subitem-index');
      this.currentsubitemselected = Number(currentstring);
    }

    this.subitems.forEach(element => {
      if (element.getAttribute('subitem-index') !== currentstring)
      {
        element.deselect();
      }
    })

    if (e instanceof CustomEvent)
    {
      this.dispatchEvent(new CustomEvent<ChildSelectEvent>('child-select', { detail: e.detail }));

      if (!this.hasAttribute('sidebar-subitem') && !this.classList.contains("selected"))
      {
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
        <o-button 
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
          <span class="caret" slot="prefix"><o-icon customsize="10" name="caret"></o-icon></span>

          <span class="group">
            ${icon ? html`<o-icon size="small" class="unselected" name="${icon}">${fallback}</o-icon>` : ''}
            ${icon_selected ? html`<o-icon size="small" class="selected" name="${icon_selected}">${fallback}</o-icon>` : ''}
            <o-typography truncate="true" variant="${this.isparent ? "C4" : "C3"}">${this.text}</o-typography>
          </span>
          ${this.counter !== undefined ? html`<o-badge mode="inactive" slot="suffix" count="${this.counter}"></o-badge>` : ''}
        </o-button>
        ${this.isparent ? '<o-divider></o-divider>' : ''}
      </div>
      <o-accordion class="sub">
        <slot @slotchange="${this.handleslotchange}"></slot>
      </o-accordion>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
      "o-sidebar-item": Item;
  }
}