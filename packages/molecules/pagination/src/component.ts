// utils 
import { html, property, debounce, query } from "@pap-it/system-utils";
import { Translator } from "@pap-it/tools-translator";
import "@pap-it/tools-translator";

// atoms 
import { OptionType, Select } from "@pap-it/select";
import "@pap-it/icon";
import "@pap-it/typography";
import "@pap-it/button";
import "@pap-it/divider";
import "@pap-it/select";

// local 
import { style } from "./style";
import { NavigationButtonType } from './types';

export class Pagination extends Translator {
  static style = style;

  @query({
    selector: 'pap-select[part="page-selector"]',
    load: function (this: Pagination) {
      this.pageselector.value = this.page.toString();
    }
  }) pageselector!: Select;
  @query({
    selector: 'pap-select[part="perpage-selector"]',
    load: function (this: Pagination) {
      this.ontotal();
    }
  }) perpageselector!: Select;

  @property({
    type: Number,
    after: function (this: Pagination) {
      this.dispatchEvent(new Event('change'));
    }
  }) page: number = 0;
  @property({
    type: Number,
    after: function (this: Pagination, value: number, old: number) {
      if (!this.pageselector) return;

      // calculate the row of the first item on the current page view
      if (!old) this.page = 0;
      else {
        const firstRow = old * this.page;

        // determine the new page number
        this.page = Math.max(0, Math.ceil(firstRow / value));
      }

      this.setpageoptions();
      this.pageselector.value = this.page.toString();
      this.dispatchEvent(new Event('change'));
    }
  }) perpage: number = 0;
  @property({
    type: Number,
    after: function (this: Pagination) {
      this.ontotal();
    }
  }) total: number = 0;

  // class functions 
  constructor() {
    super();

    this.clearlocalchange = debounce(() => this.localchange = false, 10);
  }

  private get mintotal() {
    return Math.max(this.total, 5);
  }

  // private variables and functions 
  private ontotal() {
    if (this.perpageselector) {
      this.perpageselector.options = [5, 10, 15, 20, 30, 50, 75, 100].filter(v => v <= this.mintotal).map(v => ({ value: String(v), text: String(v) }));
    }
  }
  private localchange = false;
  private clearlocalchange = () => { };
  private get MaxPage() {
    return Math.ceil(this.mintotal / this.perpage) - 1;
  }
  private setpageoptions() {
    if (!this.pageselector) return;
    if (this.perpage === 0) {
      this.pageselector.options = [];
      return;
    }
    this.pageselector.options = new Array(this.MaxPage + 1).fill(0).map((_v, i) => ({ value: i.toString(), text: (i + 1).toString() }));
  }

  // event handlers
  private handleselectchange = (e: Event) => {
    if (this.localchange) {
      this.clearlocalchange();
    }
    else {
      if (e.target === this.pageselector) {
        const value = Number(this.pageselector.value);
        this.page = value;
      }
      if (e.target === this.perpageselector) {
        const value = Number(this.perpageselector.value);
        this.perpage = value;
      }
    }
  }
  private handlebuttonclick = (e: Event) => {
    if (e.currentTarget instanceof HTMLElement) {
      const type = e.currentTarget.getAttribute('data-type');
      switch (type) {
        case "first":
          this.page = 0;
          break;

        case "prev":
          this.page = Math.max(this.page - 1, 0);
          break;

        case "next":
          this.page = Math.min(this.page + 1, this.MaxPage);
          break;

        case "last":
          this.page = this.MaxPage;
          break;

        default:
          throw new Error("navigation-type not supported: " + type);
      }

      this.localchange = true;
    }
  }

  render() {
    return html`
      <span class="flex">
        <pap-typography>
          <pap-translator>Items</pap-translator>
        </pap-typography>
        <pap-select 
          @change="${this.handleselectchange}"
          size="small" 
          mode="hug"
          placement="bottom-center"
          dynamic-width="true"
          part="perpage-selector" 
          value="${this.perpage || 5}" 
        >
        </pap-select>
      </span>
      <pap-divider mode="vertical"></pap-divider>
      <pap-typography nowrap>
        <pap-translator 
          start="${this.page * this.perpage}"
          end="${Math.min(this.page * this.perpage + this.perpage, this.total)}"
          total="${this.total}"
        >{start} - {end} of {total} items</pap-translator>
      </pap-typography>
      <pap-divider mode="vertical"></pap-divider>
      <span class="flex page">
        <pap-typography>
          <pap-translator>Page</pap-translator>
        </pap-typography>
        <pap-select
          @change="${this.handleselectchange}"
          mode="hug"
          dynamic-width="true"
          size="small"
          placement="bottom-center"
          part="page-selector"
          value="${Math.min(this.page || 0, this.MaxPage)}" 
        >
        </pap-select>
        <pap-typography nowrap>
          <pap-translator maxpage="${this.MaxPage + 1}">of {maxpage}</pap-translator>
        </pap-typography>
      </span>
      <pap-divider mode="vertical"></pap-divider>
      <span>
        <pap-button 
          @click="${this.handlebuttonclick}"
          data-type="first"
          color="secondary"
          variant="clear" 
          circle="true"
          size="small" 
        >
          <pap-icon name="pagination.first">|<</pap-icon>
        </pap-button>
        <pap-button 
          @click="${this.handlebuttonclick}"
          data-type="prev"
          color="secondary" 
          variant="clear" 
          circle="true"
          size="small" 
        >
          <pap-icon name="pagination.prev"><</pap-icon>
        </pap-button>
        <pap-button 
          @click="${this.handlebuttonclick}"
          data-type="next"
          variant="clear" 
          color="secondary" 
          circle="true"
          size="small" 
        >
          <pap-icon name="pagination.next">></pap-icon>
        </pap-button>
        <pap-button 
          @click="${this.handlebuttonclick}"
          data-type="last"
          variant="clear"
          color="secondary"
          circle="true"
          size="small" 
        >
          <pap-icon name="pagination.last">>|</pap-icon>
        </pap-button>
      </span>
    `
  }
}


declare global {
  interface HTMLElementTagNameMap {
    "pap-pagination": Pagination;
  }
}