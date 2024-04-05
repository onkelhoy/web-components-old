# Tabs

Atomic Type: atoms

Version: 0.0.0

## Development

Development takes place within the `src` folder. To add a new subcomponent, use the command `npm run component:add`. This command updates the `.env` file, creates a view folder, and adds a subfolder in the `components` folder (creating it if it doesn't exist) inside `src` with all the necessary files.

Styling is managed in the `style.scss` file, which automatically generates a `style.ts` file for use in the component.

## Viewing

To view the component, run `npm start`. This command is equivalent to `npm run start demo` and launches the development server for the demo folder located within the `views` folder. This allows you to preview your component during development.

## Assets

All assets required by the component, such as icons and images for translations, should be placed in the `assets` folder. This folder will already include an `icons` and `translations` folder with an `en.json` file for English translations. Use this structure to organize translations and make them easily accessible for other projects.

For assets used solely for display or demo purposes, create a `public` folder under the relevant directory inside the `views` folder. These assets are not included in the component package.

## Commands

- **build**: Builds the component in development mode. Use the `--prod` flag (`npm run build -- --prod`) for a production build, which includes minification.
- **watch**: Watches for changes to the component files and rebuilds them automatically without starting the development server.
- **start**: Starts the development server for a specific demo. The target folder within the `views` directory must contain an `index.html` file. Usage example: `npm run start --name=<folder>`.
- **analyse**: Generates a comprehensive analysis file, mainly useful for React scripts and potentially for generating pages. The analysis file is only generated if it does not exist, unless the `--force` flag is used. Optional flags include `--verbose` and `--force`.
- **react**: Generates the necessary React code based on the web component code, including any subcomponents. The generated code will not overwrite existing files, allowing for manual customization. Flags: `--verbose` & `--force`.

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
PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and the types can you give me the following tables.

1. properties (columns: name, default-value, type, description)
2. events (columns: name - ex: 'click', type - ex: CustomEvent<ClickEvent>, description - when its being triggered etc)
3.public functions (columns: name, arguments - ex: arg1:CustomType, arg2?: boolean = true, arg3?: string, description - breif explenation what it does)

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

## TYPE-CODE: export type SelectEvent = { id: string };PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is

 Based on the source code and style code probided. Can you create a documentation that includes titles, short descrition and the table for each tables: css-variables, parts, slots.
css-variables should be a table with columns: (name, default-value, type - ex. CSS unit, description).
parts should include all elements that have been exposed with the part attribute ex: <p part='foo'> - and the table should then include columns: (name, description (short)).
slots should include columns: (name, default-value, description)

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

## STYLE-CODE

:host {
    display: grid;
    grid-template-rows: auto 1fr;

    div[part="header-wrapper"] {
        display: grid;
        grid-template-rows: var(--pap-tabs-height, var(--unit-size7, 48px));
        grid-template-columns: 1fr minmax(5rem, auto);
    }
    
    header {
        display: flex;
        overflow-x: auto;
        position: relative;

        span.indicator {
            content: '';
            display: inline-block;
            position: absolute;
            left: 0;
            top: 100%;
            transform: translateY(-100%);
            height: var(--tabs-indicator-height, 0.3rem);
            background-color: var(--tabs-indicator-color, var(--pap-color-border-brand, #009DD3));

            transition: all var(--tabs-indicator-animation-easing, ease) var(--tabs-indicator-animation-duration, 200ms);
        }

        ::slotted(*[slot="header"]) {
            flex-grow: 1;
            z-index: 20;
        }
    }

}

:host([scrolling="true"]) {
    main {
        max-height: var(--tabs-maxheight, 15rem);
        overflow-y: auto;
    }

    ::slotted(pap-tab-content) {
        display: block;
    }
}
