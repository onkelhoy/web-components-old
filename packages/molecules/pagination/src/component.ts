// utils 
import { html, property, debounce } from "@pap-it/system-utils";
import { Translator } from "@pap-it/tools-translator";
import "@pap-it/tools-translator/wc";

// atoms 
import { Dropdown } from "@pap-it/dropdown";
import "@pap-it/icon/wc";
import "@pap-it/typography/wc";
import "@pap-it/button/wc";
import "@pap-it/divider/wc";
import "@pap-it/dropdown/wc";

// local 
import { style } from "./style";
import { NavigationButtonType } from './types';

export class Pagination extends Translator {
  static style = style;

  @property({ type: Number }) page: number = 0;
  @property({ type: Number, onUpdate: "onperpageupdate" }) perpage: number = 0;
  @property({ type: Number, onUpdate: "setInfo" }) total: number = 0;

  constructor() {
    super();

    this.clearlocalchange = debounce(() => this.localchange = false, 10);
  }

  // private variables and functions 
  private localchange = false;
  private clearlocalchange = () => { };
  private get MaxPage() {
    return Math.ceil(this.total / this.perpage) - 1;
  }
  private getrowpagearray() {
    if (this.total < 5) return [5];

    const arr = [5, 10, 15, 20, 30, 50, 75, 100].filter(v => v <= this.total);
    console.log('wtf is arr', arr);
    return arr;
  }

  // event handlers
  private handlepageselect = (e: Event) => {
    if (this.localchange) {
      this.clearlocalchange();
    }
    else if (e.target && 'value' in e.target) {
      console.log('page change', e.target.value)
      this.page = Number(e.target.value);
      this.localchange = true;
    }
  }
  private handleperpageselect = (e: Event) => {
    if (this.localchange) {
      this.clearlocalchange();
    }
    else if (e.target && 'value' in e.target) {
      console.log('per page change', e.target.value)
      this.perpage = Number(e.target.value);
      this.localchange = true;
    }
  }
  private handlebuttonclick = (type: NavigationButtonType) => {
    return () => {
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
        <pap-dropdown value="${this.perpage}" @change="${this.handleperpageselect}">
          ${this.getrowpagearray().map(value => {
      console.log('rendering array', value)
      return html`<pap-option value="${value}">${value}</pap-option>`
    })}
        </pap-dropdown>
      </span>
      <pap-divider mode="vertical"></pap-divider>
      <pap-typography>
        <pap-translator 
          start="${this.page * this.perpage}"
          end="${this.page * this.perpage + this.perpage}"
          total="${this.total}"
        >{start} - {end} of {total} items</pap-translator>
      </pap-typography>
      <pap-divider mode="vertical"></pap-divider>
      <span class="flex">
        <pap-typography>
          <pap-translator>Page</pap-translator>
        </pap-typography>
        <pap-dropdown value="${this.page}" @change="${this.handlepageselect}">
          ${new Array(this.MaxPage).fill(0).map((_v, i) => html`<pap-option value="${i}">${i}</pap-option>`)}
        </pap-dropdown>
        <pap-typography>
          <pap-translator maxpage="${this.MaxPage + 1}">of {maxpage}</pap-translator>
        </pap-typography>
      </span>
      <pap-divider mode="vertical"></pap-divider>
      <span>
        <pap-button 
          @click="${this.handlebuttonclick('first')}"
          disabled="${this.page === 0}" 
          color="secondary" 
          variant="clear" 
          circle="true" 
        >
          <pap-icon name="pagination.first">|<</pap-icon>
        </pap-button>
        <pap-button 
          @click="${this.handlebuttonclick('prev')}"
          disabled="${this.page === 0}" 
          color="secondary" 
          variant="clear" 
          circle="true" 
        >
          <pap-icon name="pagination.prev"><</pap-icon>
        </pap-button>
        <pap-button 
          @click="${this.handlebuttonclick('next')}"
          disabled="${this.page === this.MaxPage}" 
          variant="clear" 
          color="secondary" 
          circle="true" 
        >
          <pap-icon name="pagination.next">></pap-icon>
        </pap-button>
        <pap-button 
          @click="${this.handlebuttonclick('last')}"
          disabled="${this.page === this.MaxPage}" 
          variant="clear" 
          color="secondary"
          circle="true" 
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