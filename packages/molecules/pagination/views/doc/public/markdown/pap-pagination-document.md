# Pagination

Atomic Type: molecules

Version: 1.0.0

## Development

Development servers can be started and should all exist inside `"views"` folder

## Scripts
PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and register code provided to you - could you create a rather simple introduction text with maybe a code example how to use in html - keep it very simple. Do not give example how to run the register code it's already included (this is for you so you can see the element-tag)! The introduction should be read by developers so it needs not to be simple enough for beginners!

## SOURCE-CODE:
// utils 
import { html, property, query } from "@pap-it/system-utils";
import { Translator } from "@pap-it/tools-translator";
import "@pap-it/tools-translator/wc";

// atoms 
import { Dropdown } from "@pap-it/dropdown";
import "@pap-it/icon/wc";
import "@pap-it/typography/wc";
import "@pap-it/button/wc";
import "@pap-it/dropdown/wc";

// templates
// import { BaseSystem } from "@pap-it/system-base";

// local 
import { style } from "./style";
// import { Foo, ClickEvent } from "./types";

export class Pagination extends Translator {
  static style = style;

  @property({ type: Number, rerender: false }) page: number = 1;
  @property({ type: Number, rerender: false, onUpdate: "onperpageupdate" }) perpage: number = 0;
  @property({ type: Number, rerender: false, onUpdate: "setInfo" }) total: number = 0; // maybe rerender on this ? 

  @query({ selector: 'pap-dropdown[name="page"]', onload: 'onpagedload' }) pagedropdownElement!: Dropdown;
  @query('pap-dropdown[name="perpage"]') perpagedropdownElement!: Dropdown;
  @query('pap-translator') infoElement!: Translator;

  // on load functions
  private onpagedload = () => {
    this.setpageoptions();
  }
  private onperpageupdate = (value: number, old: number) => {
    if (!this.pagedropdownElement) return 10;

    // calculate the row of the first item on the current page view
    if (!old) this.page = 1;
    else {
      const firstRow = old * (this.page - 1) + 1;

      // determine the new page number
      this.page = Math.max(1, Math.ceil(firstRow / value));
    }

    this.setpageoptions();

    setTimeout(() => {
      // update the page dropdown to reflect the new page number
      this.pagedropdownElement.value = this.page.toString();
    }, 1);
  }

  // event handlers
  private handlepagechange = (e: Event) => {
    if (e.target instanceof Dropdown) {
      this.page = Number(e.target.value);
      this.setInfo();
    }
  }
  private handleperpagechange = (e: Event) => {
    if (e.target instanceof Dropdown) {
      this.perpage = Number(e.target.value);
    }
  }

  private handlefirstclick = () => {
    this.page = 1;
    this.pagedropdownElement.value = this.page.toString();
    this.setInfo();
  }
  private handleprevclick = () => {
    if (this.page > 1) {
      this.page = this.page - 1;
      this.pagedropdownElement.value = this.page.toString();
      this.setInfo();
    }
  }
  private handlenextclick = () => {
    const totalpages = Math.ceil(this.total / this.perpage);
    if (this.page + 1 <= totalpages) {
      this.page = this.page + 1;
      this.pagedropdownElement.value = this.page.toString();
      this.setInfo();
    }
  }
  private handlelastclick = () => {
    const totalpages = Math.ceil(this.total / this.perpage);
    this.page = totalpages;
    this.pagedropdownElement.value = this.page.toString();
    this.setInfo();
  }

  // private functions
  private setpageoptions() {
    if (!this.pagedropdownElement) return;
    if (this.perpage === 0) {
      this.pagedropdownElement.options = [];
      return;
    }
    const maxpages = Math.ceil(this.total / this.perpage);
    this.pagedropdownElement.options = new Array(maxpages).fill(0).map((_v, i) => i + 1);
  }
  private getrowpagearray() {
    if (this.total < 5) return [5];

    return [5, 10, 15, 20, 50, 100, 200, 500, 1000].filter(v => v <= this.total);
  }
  private setInfo = () => {
    if (this.infoElement) {
      const start = (this.page - 1) * this.perpage;
      const end = Math.min(start + this.perpage, this.total)
      this.infoElement.setAttribute("start", start.toString());
      this.infoElement.setAttribute("end", end.toString());
      this.infoElement.setAttribute("total", this.total.toString());
    }
  }

  render() {
    console.log('page is', this.page)
    return html`
            <div>
                <pap-dropdown 
                    @change="${this.handlepagechange}"
                    variant="clear" 
                    name="page"
                    value="${this.page}"
                ></pap-dropdown>
            </div>
            <div>
                <pap-dropdown 
                    @change="${this.handleperpagechange}"
                    variant="clear" 
                    name="perpage"
                    value="${this.perpage}"
                >
                    ${this.getrowpagearray().map(v => html`<pap-option>${v}</pap-option>`)}
                </pap-dropdown>
            </div>
            <pap-typography>
                <pap-translator 
                    start="${this.page * this.perpage}"
                    end="${this.page * this.perpage + this.perpage}"
                    total="${this.total}"
                >{start} - {end} of {total}</pap-translator>
            </pap-typography>

            <span class="button-group">
                <pap-button variant="outlined" color="gray" @click="${this.handlefirstclick}"><pap-icon name="pagination.first">|<</pap-icon></pap-button>
                <pap-button variant="outlined" color="gray" @click="${this.handleprevclick}"><pap-icon name="pagination.prev"><</pap-icon></pap-button>
                <pap-button variant="outlined" color="gray" @click="${this.handlenextclick}"><pap-icon name="pagination.next">></pap-icon></pap-button>
                <pap-button variant="outlined" color="gray" @click="${this.handlelastclick}"><pap-icon name="pagination.last">>|</pap-icon></pap-button>
            </span>
        `
  }
}


declare global {
  interface HTMLElementTagNameMap {
    "pap-pagination": Pagination;
  }
}
## REGISTER-CODE:
import { Pagination } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('pap-pagination')) {
  cElements.define('pap-pagination', Pagination);
}
PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and the types can you give me the following tables. 
1. properties (columns: name, default-value, type, description) 
2. events (columns: name - ex: 'click', type - ex: CustomEvent<ClickEvent>, description - when its being triggered etc) 
3.public functions (columns: name, arguments - ex: arg1:CustomType, arg2?: boolean = true, arg3?: string, description - breif explenation what it does)

## SOURCE-CODE:
 // utils 
import { html, property, query } from "@pap-it/system-utils";
import { Translator } from "@pap-it/tools-translator";
import "@pap-it/tools-translator/wc";

// atoms 
import { Dropdown } from "@pap-it/dropdown";
import "@pap-it/icon/wc";
import "@pap-it/typography/wc";
import "@pap-it/button/wc";
import "@pap-it/dropdown/wc";

// templates
// import { BaseSystem } from "@pap-it/system-base";

// local 
import { style } from "./style";
// import { Foo, ClickEvent } from "./types";

export class Pagination extends Translator {
  static style = style;

  @property({ type: Number, rerender: false }) page: number = 1;
  @property({ type: Number, rerender: false, onUpdate: "onperpageupdate" }) perpage: number = 0;
  @property({ type: Number, rerender: false, onUpdate: "setInfo" }) total: number = 0; // maybe rerender on this ? 

  @query({ selector: 'pap-dropdown[name="page"]', onload: 'onpagedload' }) pagedropdownElement!: Dropdown;
  @query('pap-dropdown[name="perpage"]') perpagedropdownElement!: Dropdown;
  @query('pap-translator') infoElement!: Translator;

  // on load functions
  private onpagedload = () => {
    this.setpageoptions();
  }
  private onperpageupdate = (value: number, old: number) => {
    if (!this.pagedropdownElement) return 10;

    // calculate the row of the first item on the current page view
    if (!old) this.page = 1;
    else {
      const firstRow = old * (this.page - 1) + 1;

      // determine the new page number
      this.page = Math.max(1, Math.ceil(firstRow / value));
    }

    this.setpageoptions();

    setTimeout(() => {
      // update the page dropdown to reflect the new page number
      this.pagedropdownElement.value = this.page.toString();
    }, 1);
  }

  // event handlers
  private handlepagechange = (e: Event) => {
    if (e.target instanceof Dropdown) {
      this.page = Number(e.target.value);
      this.setInfo();
    }
  }
  private handleperpagechange = (e: Event) => {
    if (e.target instanceof Dropdown) {
      this.perpage = Number(e.target.value);
    }
  }

  private handlefirstclick = () => {
    this.page = 1;
    this.pagedropdownElement.value = this.page.toString();
    this.setInfo();
  }
  private handleprevclick = () => {
    if (this.page > 1) {
      this.page = this.page - 1;
      this.pagedropdownElement.value = this.page.toString();
      this.setInfo();
    }
  }
  private handlenextclick = () => {
    const totalpages = Math.ceil(this.total / this.perpage);
    if (this.page + 1 <= totalpages) {
      this.page = this.page + 1;
      this.pagedropdownElement.value = this.page.toString();
      this.setInfo();
    }
  }
  private handlelastclick = () => {
    const totalpages = Math.ceil(this.total / this.perpage);
    this.page = totalpages;
    this.pagedropdownElement.value = this.page.toString();
    this.setInfo();
  }

  // private functions
  private setpageoptions() {
    if (!this.pagedropdownElement) return;
    if (this.perpage === 0) {
      this.pagedropdownElement.options = [];
      return;
    }
    const maxpages = Math.ceil(this.total / this.perpage);
    this.pagedropdownElement.options = new Array(maxpages).fill(0).map((_v, i) => i + 1);
  }
  private getrowpagearray() {
    if (this.total < 5) return [5];

    return [5, 10, 15, 20, 50, 100, 200, 500, 1000].filter(v => v <= this.total);
  }
  private setInfo = () => {
    if (this.infoElement) {
      const start = (this.page - 1) * this.perpage;
      const end = Math.min(start + this.perpage, this.total)
      this.infoElement.setAttribute("start", start.toString());
      this.infoElement.setAttribute("end", end.toString());
      this.infoElement.setAttribute("total", this.total.toString());
    }
  }

  render() {
    console.log('page is', this.page)
    return html`
            <div>
                <pap-dropdown 
                    @change="${this.handlepagechange}"
                    variant="clear" 
                    name="page"
                    value="${this.page}"
                ></pap-dropdown>
            </div>
            <div>
                <pap-dropdown 
                    @change="${this.handleperpagechange}"
                    variant="clear" 
                    name="perpage"
                    value="${this.perpage}"
                >
                    ${this.getrowpagearray().map(v => html`<pap-option>${v}</pap-option>`)}
                </pap-dropdown>
            </div>
            <pap-typography>
                <pap-translator 
                    start="${this.page * this.perpage}"
                    end="${this.page * this.perpage + this.perpage}"
                    total="${this.total}"
                >{start} - {end} of {total}</pap-translator>
            </pap-typography>

            <span class="button-group">
                <pap-button variant="outlined" color="gray" @click="${this.handlefirstclick}"><pap-icon name="pagination.first">|<</pap-icon></pap-button>
                <pap-button variant="outlined" color="gray" @click="${this.handleprevclick}"><pap-icon name="pagination.prev"><</pap-icon></pap-button>
                <pap-button variant="outlined" color="gray" @click="${this.handlenextclick}"><pap-icon name="pagination.next">></pap-icon></pap-button>
                <pap-button variant="outlined" color="gray" @click="${this.handlelastclick}"><pap-icon name="pagination.last">>|</pap-icon></pap-button>
            </span>
        `
  }
}


declare global {
  interface HTMLElementTagNameMap {
    "pap-pagination": Pagination;
  }
}

## TYPE-CODE: export {}PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and style code probided. Can you create a documentation that includes titles, short descrition and the table for each tables: css-variables, parts, slots.
css-variables should be a table with columns: (name, default-value, type - ex. CSS unit, description).
parts should include all elements that have been exposed with the part attribute ex: <p part='foo'> - and the table should then include columns: (name, description (short)).
slots should include columns: (name, default-value, description)

## SOURCE-CODE:
// utils 
import { html, property, query } from "@pap-it/system-utils";
import { Translator } from "@pap-it/tools-translator";
import "@pap-it/tools-translator/wc";

// atoms 
import { Dropdown } from "@pap-it/dropdown";
import "@pap-it/icon/wc";
import "@pap-it/typography/wc";
import "@pap-it/button/wc";
import "@pap-it/dropdown/wc";

// templates
// import { BaseSystem } from "@pap-it/system-base";

// local 
import { style } from "./style";
// import { Foo, ClickEvent } from "./types";

export class Pagination extends Translator {
  static style = style;

  @property({ type: Number, rerender: false }) page: number = 1;
  @property({ type: Number, rerender: false, onUpdate: "onperpageupdate" }) perpage: number = 0;
  @property({ type: Number, rerender: false, onUpdate: "setInfo" }) total: number = 0; // maybe rerender on this ? 

  @query({ selector: 'pap-dropdown[name="page"]', onload: 'onpagedload' }) pagedropdownElement!: Dropdown;
  @query('pap-dropdown[name="perpage"]') perpagedropdownElement!: Dropdown;
  @query('pap-translator') infoElement!: Translator;

  // on load functions
  private onpagedload = () => {
    this.setpageoptions();
  }
  private onperpageupdate = (value: number, old: number) => {
    if (!this.pagedropdownElement) return 10;

    // calculate the row of the first item on the current page view
    if (!old) this.page = 1;
    else {
      const firstRow = old * (this.page - 1) + 1;

      // determine the new page number
      this.page = Math.max(1, Math.ceil(firstRow / value));
    }

    this.setpageoptions();

    setTimeout(() => {
      // update the page dropdown to reflect the new page number
      this.pagedropdownElement.value = this.page.toString();
    }, 1);
  }

  // event handlers
  private handlepagechange = (e: Event) => {
    if (e.target instanceof Dropdown) {
      this.page = Number(e.target.value);
      this.setInfo();
    }
  }
  private handleperpagechange = (e: Event) => {
    if (e.target instanceof Dropdown) {
      this.perpage = Number(e.target.value);
    }
  }

  private handlefirstclick = () => {
    this.page = 1;
    this.pagedropdownElement.value = this.page.toString();
    this.setInfo();
  }
  private handleprevclick = () => {
    if (this.page > 1) {
      this.page = this.page - 1;
      this.pagedropdownElement.value = this.page.toString();
      this.setInfo();
    }
  }
  private handlenextclick = () => {
    const totalpages = Math.ceil(this.total / this.perpage);
    if (this.page + 1 <= totalpages) {
      this.page = this.page + 1;
      this.pagedropdownElement.value = this.page.toString();
      this.setInfo();
    }
  }
  private handlelastclick = () => {
    const totalpages = Math.ceil(this.total / this.perpage);
    this.page = totalpages;
    this.pagedropdownElement.value = this.page.toString();
    this.setInfo();
  }

  // private functions
  private setpageoptions() {
    if (!this.pagedropdownElement) return;
    if (this.perpage === 0) {
      this.pagedropdownElement.options = [];
      return;
    }
    const maxpages = Math.ceil(this.total / this.perpage);
    this.pagedropdownElement.options = new Array(maxpages).fill(0).map((_v, i) => i + 1);
  }
  private getrowpagearray() {
    if (this.total < 5) return [5];

    return [5, 10, 15, 20, 50, 100, 200, 500, 1000].filter(v => v <= this.total);
  }
  private setInfo = () => {
    if (this.infoElement) {
      const start = (this.page - 1) * this.perpage;
      const end = Math.min(start + this.perpage, this.total)
      this.infoElement.setAttribute("start", start.toString());
      this.infoElement.setAttribute("end", end.toString());
      this.infoElement.setAttribute("total", this.total.toString());
    }
  }

  render() {
    console.log('page is', this.page)
    return html`
            <div>
                <pap-dropdown 
                    @change="${this.handlepagechange}"
                    variant="clear" 
                    name="page"
                    value="${this.page}"
                ></pap-dropdown>
            </div>
            <div>
                <pap-dropdown 
                    @change="${this.handleperpagechange}"
                    variant="clear" 
                    name="perpage"
                    value="${this.perpage}"
                >
                    ${this.getrowpagearray().map(v => html`<pap-option>${v}</pap-option>`)}
                </pap-dropdown>
            </div>
            <pap-typography>
                <pap-translator 
                    start="${this.page * this.perpage}"
                    end="${this.page * this.perpage + this.perpage}"
                    total="${this.total}"
                >{start} - {end} of {total}</pap-translator>
            </pap-typography>

            <span class="button-group">
                <pap-button variant="outlined" color="gray" @click="${this.handlefirstclick}"><pap-icon name="pagination.first">|<</pap-icon></pap-button>
                <pap-button variant="outlined" color="gray" @click="${this.handleprevclick}"><pap-icon name="pagination.prev"><</pap-icon></pap-button>
                <pap-button variant="outlined" color="gray" @click="${this.handlenextclick}"><pap-icon name="pagination.next">></pap-icon></pap-button>
                <pap-button variant="outlined" color="gray" @click="${this.handlelastclick}"><pap-icon name="pagination.last">>|</pap-icon></pap-button>
            </span>
        `
  }
}


declare global {
  interface HTMLElementTagNameMap {
    "pap-pagination": Pagination;
  }
}
## STYLE-CODE:
:host {
    display: grid;
    grid-template-columns: 4fr 4fr 2fr 3fr;
    align-items: center;
    gap: var(--gap-small, 8px);

    pap-button {
        gap: 0;
    }
    pap-typography {
        white-space: nowrap;
        margin-inline: 1rem;
        text-align: center;
    }

    span.button-group {
        display: flex;
        justify-content: flex-end;
    }
}