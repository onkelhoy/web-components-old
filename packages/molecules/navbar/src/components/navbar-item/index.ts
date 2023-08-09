// utils 
import { ExtractSlotValue, FormatNumber, html, property, query } from "@onkelhoy/tools-utils";
import "@onkelhoy/tools-translator/wc";

// atoms 
import { Accordion } from "@onkelhoy/accordion";
import "@onkelhoy/button/wc";
import "@onkelhoy/icon/wc";
import "@onkelhoy/divider/wc";
import "@onkelhoy/typography/wc";
import "@onkelhoy/accordion/wc";

// templates
import { BaseTemplate } from "@onkelhoy/templates-base";
import '@onkelhoy/templates-box/wc'

import { style } from "./style";

export type ChildSelectEvent = NavbarItem;

export class NavbarItem extends BaseTemplate {
  static style = style;

  @property() icon?:string;
  @property() icon_selected?:string;
  @property() text:string = "";
  @property({ type: Number }) count?:number;
  @property({ rerender: false, type: Boolean }) isparent:boolean = false;
  @property({ rerender: false, type: Boolean, onUpdate: "onaccordionopenupdate" }) accordionopen:boolean = false;

  // elements 
  @query('o-accordion') accordionElement!: Accordion;

  private subitems: Array<NavbarItem> = [];
  private currentsubitemselected = 0;

  // on updates
  public onaccordionopenupdate = () => {
    if (this.accordionElement)
    {
      this.accordionElement.open = this.accordionopen;
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
        if (element instanceof NavbarItem)
        {
          if (!element.hasAttribute('navbar-subitem')) 
          {
            if (!this.isparent) 
            {
              this.isparent = true;
            }

            element.setAttribute('subitem-index', this.subitems.length.toString());
            this.subitems.push(element);
            element.addEventListener('reached-max', this.handlereachedmax);
            element.addEventListener('child-select', this.hanlechildselect);
            element.setAttribute('navbar-subitem', 'true');
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
        this.accordionopen = !this.accordionopen;
      }
    }
    else 
    {
      if (this.hasAttribute('navbar-subitem')) 
      {
        this.dispatchEvent(new CustomEvent<ChildSelectEvent>('child-select', { detail: this }));
      }
      this.dispatchEvent(new Event('select'));
      this.classList.add('selected');
    }
  }
  private hanlechildselect = (e:Event) => {
    let currentstring:null|string = null;
    if (e.target instanceof NavbarItem)
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

      if (!this.hasAttribute('navbar-subitem') && !this.classList.contains("selected"))
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
      <o-button @click="${this.handleclick}" mode="fill" radius="medium" size="large">
        <span class="indicator" slot="prefix"></span>
        <span class="caret" slot="prefix"><o-icon name="caret"></o-icon></span>

        <span class="group">
          ${icon ? html`<o-icon class="unselected" name="${this.icon||""}">${fallback}</o-icon>` : ''}
          ${icon_selected ? html`<o-icon class="selected" name="${this.icon_selected||this.icon||""}">${fallback}</o-icon>` : ''}
          <o-typography>${this.text}</o-typography>
        </span>
        ${this.count !== undefined ? html`<o-box-template slot="suffix" class="counter"><o-typography variant="C4">${FormatNumber(this.count)}</o-typography></o-box-template>` : ''}
      </o-button>
      <o-accordion class="sub">
        <slot @slotchange="${this.handleslotchange}"></slot>
      </o-accordion>
    `
  }
}