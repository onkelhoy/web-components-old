PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and register code provided to you - could you create a rather simple introduction text with maybe a code example how to use in html - keep it very simple. Do not give example how to run the register code it's already included (this is for you so you can see the element-tag)! The introduction should be read by developers so it needs not to be simple enough for beginners!

## SOURCE-CODE

// utils
import { html, property } from "@pap-it/system-utils";

// templates
import { Base } from "@pap-it/system-base";

// local
import { style } from "./style";
import { Tab } from "./components/tab";
import { TabContent } from "./components/content";
import { SelectEvent } from "./types";

export class Tabs extends Base {
    static style = style;

    private tabs:Tab[] = [];
    private contents:TabContent[] = [];
    private currentlyscrolling: boolean = false;
    private scrollclick = false;
    private internalclick = false;

    // elements 
    private indicatorElement!: HTMLSpanElement;
    private headerElement!: HTMLElement;
    private mainElement!: HTMLElement;

    @property({ type: Boolean }) indicator: boolean = false;
    @property({ rerender: false, type: Boolean }) scrolling: boolean = false;

    // event handlers
    private handleslotchange = (e:Event) => {
        if (e.target instanceof HTMLSlotElement)
        {
            e.target
                .assignedElements()
                .forEach((element, index) => {
                    if (!element.hasAttribute('data-tabs-pass'))
                    {
                        const isContent = element instanceof TabContent;
                        const isTab = element instanceof Tab;

                        let id = index.toString();
                        if (isContent) 
                        {
                            id = this.contents.length.toString();
                            this.contents.push(element);
                        }
                        if (isTab) 
                        {
                            id = this.tabs.length.toString();
                            element.addEventListener('click', this.handletabclick);
                            this.tabs.push(element);
                        }

                        if (element.hasAttribute('id'))
                        {
                            id = element.getAttribute('id') as string;
                        }

                        if (isContent || isTab)
                        {
                            element.init(this);
                            element.setAttribute('data-tab-id', id);
                            element.setAttribute('data-tabs-pass', 'true');
                        }
                    }
                });
        }
    }
    private handletabclick = (e:Event) => {
        if (e.target instanceof Tab)
        {
            if (!this.scrollclick)
            {
                this.internalclick = true;
            }

            const id = e.target.getAttribute('data-tab-id') as string
            this.dispatchEvent(new CustomEvent<SelectEvent>("tab-select", { detail: { id } }));

            if (this.headerElement)
            {
                const SX = e.target.offsetLeft - this.headerElement.offsetLeft;
                const SXE = SX + e.target.clientWidth;

                // check if the current view can show it (so we dont do unecessary scrolls)
                if (SXE > this.headerElement.scrollLeft + this.headerElement.clientWidth || SX < this.headerElement.scrollLeft)
                {
                    this.headerElement.scrollTo({
                        left: SX,
                        behavior: "smooth"
                    })
                }
                if (this.indicator && this.indicatorElement)
                {
                    this.indicatorElement.style.left = SX+"px";
                    this.indicatorElement.style.width = e.target.clientWidth+"px";
                }
            }


            if (this.scrolling && this.mainElement && !this.currentlyscrolling)
            {
                const content = this.contents.find(c => c.getAttribute('data-tab-id') === id);
                if (content)
                {
                    this.mainElement.scrollTo({
                        top: content.offsetTop - this.mainElement.offsetTop,
                        behavior: 'smooth'
                    })
                }
            }
        }
    }
    private handlescroll = (e:Event) => {
        if (this.scrolling && this.mainElement)
        {
            this.currentlyscrolling = true;
            const ST = this.mainElement.scrollTop;
            let accumulated = 0;
            for (let i=0; i<this.contents.length; i++)
            {
                accumulated += this.contents[i].clientHeight;
                if (ST < accumulated)
                {
                    if (!this.tabs[i].classList.contains('selected')) {
                        this.scrollclick = true;
                        if (!this.internalclick) this.tabs[i].click()
                    }
                    break;
                }
            }
        }
    }
    private handlescrollend = (e:Event) => {
        this.currentlyscrolling = false;
        this.internalclick = false;
        this.scrollclick = false;
    }

    // class functions
    firstUpdate(): void {
        if (this.shadowRoot)
        {
            const header = this.shadowRoot.querySelector('header');
            if (header) this.headerElement = header;
            const main = this.shadowRoot.querySelector('main');
            if (main) this.mainElement = main;
            const span = this.shadowRoot.querySelector<HTMLSpanElement>('span.indicator');
            if (span) this.indicatorElement = span;
        }
    }

    render() {
        return html`
            <div part="header-wrapper">
                <header part="header">
                    <slot @slotchange="${this.handleslotchange}" name="tab"></slot>
                    <span class='indicator'></span>
                </header>
                <slot name="header"></slot>
            </div>
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

## REGISTER-CODE

import { Tabs } from './component.js';
import { Tab } from './components/tab/index.js';
import { TabContent } from './components/content/index.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('pap-tab')) {
  cElements.define('pap-tab', Tab);
}

if (!cElements.get('pap-tab-content')) {
  cElements.define('pap-tab-content', TabContent);
}

if (!cElements.get('pap-tabs')) {
  cElements.define('pap-tabs', Tabs);
}
