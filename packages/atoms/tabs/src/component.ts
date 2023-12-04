// utils 
import { html, property, query } from "@pap-it/system-utils";

// templates
import { BaseSystem } from "@pap-it/system-base";

// local 
import { style } from "./style";
import { Tab } from "./components/tab";
import { TabContent } from "./components/content";
import { SelectEvent } from "./types";

export class Tabs extends BaseSystem {
  static style = style;

  private tabs: Tab[] = [];
  private contents: TabContent[] = [];
  private currentlyscrolling: boolean = false;
  private scrollclick = false;
  private internalclick = false;

  // elements 
  @query('span[part="indicator"]') indicatorElement!: HTMLSpanElement;
  @query('div[part="header-tabs"]') headerElement!: HTMLElement;
  @query('main') mainElement!: HTMLElement;

  // preselect = true makes sure tabs automatically selects the index (default = 0)
  // NOTE preselect = index out of bounds will result in no preselected
  @property({ type: Number, rerender: false }) preselect: number = 0;
  @property({ type: Boolean }) indicator: boolean = true;
  @property({ rerender: false, type: Boolean }) scrolling: boolean = false;

  // event handlers
  private handleslotchange = (e: Event) => {
    if (e.target instanceof HTMLSlotElement) {
      let selected: null | number = null;
      let firsttab: Tab | null = null;
      e.target
        .assignedElements()
        .forEach((element, index) => {
          if (!element.hasAttribute('data-tabs-pass')) {
            const isContent = element instanceof TabContent;
            const isTab = element instanceof Tab;

            let id = index.toString();
            if (isContent) {
              id = this.contents.length.toString();
              this.contents.push(element);
            }
            if (isTab) {
              if (!firsttab && index === this.preselect) firsttab = element;
              id = this.tabs.length.toString();
              element.addEventListener('click', this.handletabclick);

              if (element.classList.contains('selected')) selected = index;
              this.tabs.push(element);
            }

            if (element.hasAttribute('id')) {
              id = element.getAttribute('id') as string;
            }

            if (isContent || isTab) {
              element.init(this);
              element.setAttribute('data-tab-id', id);
              element.setAttribute('data-tabs-pass', 'true');
            }
          }
        });

      if (selected === null) {
        if (firsttab !== null) {
          setTimeout(() => {
            (firsttab as Tab).click();
          }, 100)
        }
      }
    }
  }
  private handletabclick = (e: Event) => {
    if (e.target instanceof Tab) {
      if (!this.scrollclick) {
        this.internalclick = true;
      }

      const id = e.target.getAttribute('data-tab-id') as string
      this.dispatchEvent(new CustomEvent<SelectEvent>("tab-select", { detail: { id } }));
      this.dispatchEvent(new Event('change'));

      if (this.headerElement) {
        const SX = e.target.offsetLeft - this.headerElement.offsetLeft - this.offsetLeft;
        const SXE = SX + e.target.clientWidth;

        // check if the current view can show it (so we dont do unecessary scrolls)
        if (SXE > this.headerElement.scrollLeft + this.headerElement.clientWidth || SX < this.headerElement.scrollLeft) {
          this.headerElement.scrollTo({
            left: SX,
            behavior: "smooth"
          })
        }
        if (this.indicator && this.indicatorElement) {
          this.indicatorElement.style.left = SX + "px";
          this.indicatorElement.style.width = e.target.clientWidth + "px";
        }
      }


      if (this.scrolling && this.mainElement && !this.currentlyscrolling) {
        const content = this.contents.find(c => c.getAttribute('data-tab-id') === id);
        if (content) {
          this.mainElement.scrollTo({
            top: content.offsetTop - this.mainElement.offsetTop,
            behavior: 'smooth'
          })
        }
      }
    }
  }
  private handlescroll = (e: Event) => {
    if (this.scrolling && this.mainElement) {
      this.currentlyscrolling = true;
      const ST = this.mainElement.scrollTop;
      let accumulated = 0;
      for (let i = 0; i < this.contents.length; i++) {
        accumulated += this.contents[i].clientHeight;
        if (ST < accumulated) {
          if (!this.tabs[i].classList.contains('selected')) {
            this.scrollclick = true;
            if (!this.internalclick) this.tabs[i].click()
          }
          break;
        }
      }
    }
  }
  private handlescrollend = (e: Event) => {
    this.currentlyscrolling = false;
    this.internalclick = false;
    this.scrollclick = false;
  }

  render() {
    return html`
      <header part="header">
        <slot name="header-top"></slot>
        <div part="header-content">
          <slot name="header-prefix"></slot>
          <div part="header-tabs">
            <slot @slotchange="${this.handleslotchange}" name="tab"></slot>
            <span part="indicator"></span>
          </div>
          <slot name="header-suffix"></slot>
        </div>
        <slot name="header-below"></slot>
      </header>
      <slot name="between"></slot>
      <main @scroll="${this.handlescroll}" @scrollend="${this.handlescrollend}" part="content">
        <slot @slotchange="${this.handleslotchange}" name="content"></slot>
      </main>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pap-tabs": Tabs;
  }
}