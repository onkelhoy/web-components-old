PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and the types can you give me the following tables. 
1. properties (columns: name, default-value, type, description) 
2. events (columns: name - ex: 'click', type - ex: CustomEvent<ClickEvent>, description - when its being triggered etc) 
3.public functions (columns: name, arguments - ex: arg1:CustomType, arg2?: boolean = true, arg3?: string, description - breif explenation what it does)

## SOURCE-CODE:
 // utils 
import { html, property } from "@henry2/tools-utils";

// templates
import { BaseTemplate } from "@henry2/templates-base";

// local 
import { style } from "./style";
import { Tab } from "./components/tab";
import { TabContent } from "./components/content";
import { SelectEvent } from "./types";

export class Tabs extends BaseTemplate {
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
        "o-tabs": Tabs;
    }
}

## TYPE-CODE: export type SelectEvent = { id: string };