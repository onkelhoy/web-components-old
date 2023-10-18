# Sidebar

Atomic Type: molecules

Version: 0.0.0

## Development

Development servers can be started and should all exist inside `"views"` folder

## Scripts

PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and register code provided to you - could you create a rather simple introduction text with maybe a code example how to use in html - keep it very simple. Do not give example how to run the register code it's already included (this is for you so you can see the element-tag)! The introduction should be read by developers so it needs not to be simple enough for beginners!

## SOURCE-CODE

// utils
import { html, property, query } from "@pap-it/system-utils";
import "@pap-it/tools-translator/wc";

// atoms
import "@pap-it/button/wc";
import "@pap-it/icon/wc";
import "@pap-it/divider/wc";
import "@pap-it/typography/wc";

// templates
import { BoxTemplate } from "@pap-it/templates-box";
import { BaseSystem } from "@pap-it/system-base";
import '@pap-it/templates-box/wc'

// local
import { style } from "./style";
import { Mode, SelectEvent } from "./types";
import { Item } from "./components/item";

export class Sidebar extends BaseSystem {
    static style = style;

    @property({ rerender: false }) mode:Mode = "open";
    @property({ onUpdate: "updateSelected" }) selected?:string;

    @query('pap-box-template') boxtemplateElement!: BoxTemplate;
    
    private items: Array<Item> = [];
    private currentSelected?: Item;
    private currentAncestorSelected?: Item;

    // class functions 
    connectedCallback(): void {
        super.connectedCallback();
        window.addEventListener("theme-appearance-change", this.handleThemeAppearanceChange);
    }
    disconnectedCallback(): void {
        super.disconnectedCallback();
        window.removeEventListener("theme-appearance-change", this.handleThemeAppearanceChange);
    }

    // update handlers
    private updateSelected = () => {
        const element = this.items.find(e => e.id === this.selected || e.text === this.selected);
        if (element)
        {
            element.click();
        }
        else 
        {
            return 10;
        }
    }

    // event handlers
    private handleThemeAppearanceChange = (e:Event) => {
        if (e instanceof CustomEvent)
        {
            this.classList.remove('theme-light', 'theme-dark');
            this.classList.add(`theme-${e.detail.value}`);
        }
    }
    private handlehamburgerclick = () => {
        // this.open = !this.open;
        if (this.boxtemplateElement) this.boxtemplateElement.elevation = "none"
        if (this.mode === "open")
        {
            // this.mode = "collapsed";
            this.mode = "hover";
            if (this.boxtemplateElement) this.boxtemplateElement.elevation = "medium"
        }
        // else if (this.mode === "collapsed")
        // {
        //     this.mode = "hover";
        //     if (this.boxtemplateElement) this.boxtemplateElement.elevation = "medium"
        // }
        else if (this.mode === "hover")
        {
            this.mode = "open";
        }
        
        this.dispatchEvent(new Event("change"));
    }
    private handleslotchange = (e:Event) => {
        if (e.target instanceof HTMLSlotElement)
        {
            const elements = e.target.assignedElements();
            elements.forEach(element => {
                if (element instanceof Item)
                {
                    if (!element.hasAttribute("navbar-init"))
                    {
                        element.addEventListener('select', this.handleitemselect);
                        element.addEventListener('child-select', this.handleancestorselect);
                        element.setAttribute('navbar-init', 'true');
                        this.items.push(element);
                    }
                }
            })

        }
    }
    private handleitemselect = (e:Event) => {
        if (e.target instanceof Item) 
        {
            this.currentAncestorSelected?.deselect();
            if (e.target !== this.currentSelected) 
            {
                this.currentSelected?.deselect();
            }
            this.currentSelected = e.target;

            this.dispatchEvent(new CustomEvent<SelectEvent>("select", { detail: { id: e.target.id || e.target.text }}));
        }
    }
    private handleancestorselect = (e:Event) => {
        if (e instanceof CustomEvent && e.target instanceof Item)     
        {
            const childtarget = e.detail as Item;
            if (e.target !== this.currentAncestorSelected) 
            {
                this.currentAncestorSelected?.deselect();
            }
            if (childtarget !== this.currentSelected)
            {
                this.currentSelected?.deselect();
                this.currentSelected = childtarget;

                this.dispatchEvent(new CustomEvent<SelectEvent>("select", { detail: { id: childtarget.id || childtarget.text }}));
            }
            this.currentAncestorSelected = e.target;
        }
    }

    render() {
        return html`
            <pap-box-template radius="medium">
                <header>
                    <pap-icon class="logo light" style="width:124px" size="large" name="interzero-logo"></pap-icon>
                    <pap-icon class="logo dark" style="width:124px" size="large" name="interzero-logo-dark"></pap-icon>
                    <pap-button color="secondary" circle variant="clear" @click="${this.handlehamburgerclick}">
                        <!-- <pap-icon customSize="32" class="hover" name="circular-logo"></pap-icon> -->
                        <pap-icon size="small" class="open" name="hamburger.open"></pap-icon>
                        <!-- <pap-icon size="small" class="collapsed" name="hamburger.collapse"></pap-icon> -->
                    </pap-button>
                </header>
                <pap-divider></pap-divider>
                <div class="body">
                    <slot @slotchange="${this.handleslotchange}"></slot>
                </div>
            </pap-box-template>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "pap-sidebar": Sidebar;
    }
}

## REGISTER-CODE

import { Item } from './components/item';
import { Sidebar } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('pap-sidebar')) {
  cElements.define('pap-sidebar', Sidebar);
}
if (!cElements.get('pap-sidebar-item')) {
  cElements.define('pap-sidebar-item', Item);
}
PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and the types can you give me the following tables.

1. properties (columns: name, default-value, type, description)
2. events (columns: name - ex: 'click', type - ex: CustomEvent<ClickEvent>, description - when its being triggered etc)
3.public functions (columns: name, arguments - ex: arg1:CustomType, arg2?: boolean = true, arg3?: string, description - breif explenation what it does)

## SOURCE-CODE

 // utils
import { html, property, query } from "@pap-it/system-utils";
import "@pap-it/tools-translator/wc";

// atoms
import "@pap-it/button/wc";
import "@pap-it/icon/wc";
import "@pap-it/divider/wc";
import "@pap-it/typography/wc";

// templates
import { BoxTemplate } from "@pap-it/templates-box";
import { BaseSystem } from "@pap-it/system-base";
import '@pap-it/templates-box/wc'

// local
import { style } from "./style";
import { Mode, SelectEvent } from "./types";
import { Item } from "./components/item";

export class Sidebar extends BaseSystem {
    static style = style;

    @property({ rerender: false }) mode:Mode = "open";
    @property({ onUpdate: "updateSelected" }) selected?:string;

    @query('pap-box-template') boxtemplateElement!: BoxTemplate;
    
    private items: Array<Item> = [];
    private currentSelected?: Item;
    private currentAncestorSelected?: Item;

    // class functions 
    connectedCallback(): void {
        super.connectedCallback();
        window.addEventListener("theme-appearance-change", this.handleThemeAppearanceChange);
    }
    disconnectedCallback(): void {
        super.disconnectedCallback();
        window.removeEventListener("theme-appearance-change", this.handleThemeAppearanceChange);
    }

    // update handlers
    private updateSelected = () => {
        const element = this.items.find(e => e.id === this.selected || e.text === this.selected);
        if (element)
        {
            element.click();
        }
        else 
        {
            return 10;
        }
    }

    // event handlers
    private handleThemeAppearanceChange = (e:Event) => {
        if (e instanceof CustomEvent)
        {
            this.classList.remove('theme-light', 'theme-dark');
            this.classList.add(`theme-${e.detail.value}`);
        }
    }
    private handlehamburgerclick = () => {
        // this.open = !this.open;
        if (this.boxtemplateElement) this.boxtemplateElement.elevation = "none"
        if (this.mode === "open")
        {
            // this.mode = "collapsed";
            this.mode = "hover";
            if (this.boxtemplateElement) this.boxtemplateElement.elevation = "medium"
        }
        // else if (this.mode === "collapsed")
        // {
        //     this.mode = "hover";
        //     if (this.boxtemplateElement) this.boxtemplateElement.elevation = "medium"
        // }
        else if (this.mode === "hover")
        {
            this.mode = "open";
        }
        
        this.dispatchEvent(new Event("change"));
    }
    private handleslotchange = (e:Event) => {
        if (e.target instanceof HTMLSlotElement)
        {
            const elements = e.target.assignedElements();
            elements.forEach(element => {
                if (element instanceof Item)
                {
                    if (!element.hasAttribute("navbar-init"))
                    {
                        element.addEventListener('select', this.handleitemselect);
                        element.addEventListener('child-select', this.handleancestorselect);
                        element.setAttribute('navbar-init', 'true');
                        this.items.push(element);
                    }
                }
            })

        }
    }
    private handleitemselect = (e:Event) => {
        if (e.target instanceof Item) 
        {
            this.currentAncestorSelected?.deselect();
            if (e.target !== this.currentSelected) 
            {
                this.currentSelected?.deselect();
            }
            this.currentSelected = e.target;

            this.dispatchEvent(new CustomEvent<SelectEvent>("select", { detail: { id: e.target.id || e.target.text }}));
        }
    }
    private handleancestorselect = (e:Event) => {
        if (e instanceof CustomEvent && e.target instanceof Item)     
        {
            const childtarget = e.detail as Item;
            if (e.target !== this.currentAncestorSelected) 
            {
                this.currentAncestorSelected?.deselect();
            }
            if (childtarget !== this.currentSelected)
            {
                this.currentSelected?.deselect();
                this.currentSelected = childtarget;

                this.dispatchEvent(new CustomEvent<SelectEvent>("select", { detail: { id: childtarget.id || childtarget.text }}));
            }
            this.currentAncestorSelected = e.target;
        }
    }

    render() {
        return html`
            <pap-box-template radius="medium">
                <header>
                    <pap-icon class="logo light" style="width:124px" size="large" name="interzero-logo"></pap-icon>
                    <pap-icon class="logo dark" style="width:124px" size="large" name="interzero-logo-dark"></pap-icon>
                    <pap-button color="secondary" circle variant="clear" @click="${this.handlehamburgerclick}">
                        <!-- <pap-icon customSize="32" class="hover" name="circular-logo"></pap-icon> -->
                        <pap-icon size="small" class="open" name="hamburger.open"></pap-icon>
                        <!-- <pap-icon size="small" class="collapsed" name="hamburger.collapse"></pap-icon> -->
                    </pap-button>
                </header>
                <pap-divider></pap-divider>
                <div class="body">
                    <slot @slotchange="${this.handleslotchange}"></slot>
                </div>
            </pap-box-template>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "pap-sidebar": Sidebar;
    }
}

## TYPE-CODE: export type SelectEvent = { id: string }

export type Mode = "open" | "collapsed" | "hover";PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and style code probided. Can you create a documentation that includes titles, short descrition and the table for each tables: css-variables, parts, slots.
css-variables should be a table with columns: (name, default-value, type - ex. CSS unit, description).
parts should include all elements that have been exposed with the part attribute ex: <p part='foo'> - and the table should then include columns: (name, description (short)).
slots should include columns: (name, default-value, description)

## SOURCE-CODE

// utils
import { html, property, query } from "@pap-it/system-utils";
import "@pap-it/tools-translator/wc";

// atoms
import "@pap-it/button/wc";
import "@pap-it/icon/wc";
import "@pap-it/divider/wc";
import "@pap-it/typography/wc";

// templates
import { BoxTemplate } from "@pap-it/templates-box";
import { BaseSystem } from "@pap-it/system-base";
import '@pap-it/templates-box/wc'

// local
import { style } from "./style";
import { Mode, SelectEvent } from "./types";
import { Item } from "./components/item";

export class Sidebar extends BaseSystem {
    static style = style;

    @property({ rerender: false }) mode:Mode = "open";
    @property({ onUpdate: "updateSelected" }) selected?:string;

    @query('pap-box-template') boxtemplateElement!: BoxTemplate;
    
    private items: Array<Item> = [];
    private currentSelected?: Item;
    private currentAncestorSelected?: Item;

    // class functions 
    connectedCallback(): void {
        super.connectedCallback();
        window.addEventListener("theme-appearance-change", this.handleThemeAppearanceChange);
    }
    disconnectedCallback(): void {
        super.disconnectedCallback();
        window.removeEventListener("theme-appearance-change", this.handleThemeAppearanceChange);
    }

    // update handlers
    private updateSelected = () => {
        const element = this.items.find(e => e.id === this.selected || e.text === this.selected);
        if (element)
        {
            element.click();
        }
        else 
        {
            return 10;
        }
    }

    // event handlers
    private handleThemeAppearanceChange = (e:Event) => {
        if (e instanceof CustomEvent)
        {
            this.classList.remove('theme-light', 'theme-dark');
            this.classList.add(`theme-${e.detail.value}`);
        }
    }
    private handlehamburgerclick = () => {
        // this.open = !this.open;
        if (this.boxtemplateElement) this.boxtemplateElement.elevation = "none"
        if (this.mode === "open")
        {
            // this.mode = "collapsed";
            this.mode = "hover";
            if (this.boxtemplateElement) this.boxtemplateElement.elevation = "medium"
        }
        // else if (this.mode === "collapsed")
        // {
        //     this.mode = "hover";
        //     if (this.boxtemplateElement) this.boxtemplateElement.elevation = "medium"
        // }
        else if (this.mode === "hover")
        {
            this.mode = "open";
        }
        
        this.dispatchEvent(new Event("change"));
    }
    private handleslotchange = (e:Event) => {
        if (e.target instanceof HTMLSlotElement)
        {
            const elements = e.target.assignedElements();
            elements.forEach(element => {
                if (element instanceof Item)
                {
                    if (!element.hasAttribute("navbar-init"))
                    {
                        element.addEventListener('select', this.handleitemselect);
                        element.addEventListener('child-select', this.handleancestorselect);
                        element.setAttribute('navbar-init', 'true');
                        this.items.push(element);
                    }
                }
            })

        }
    }
    private handleitemselect = (e:Event) => {
        if (e.target instanceof Item) 
        {
            this.currentAncestorSelected?.deselect();
            if (e.target !== this.currentSelected) 
            {
                this.currentSelected?.deselect();
            }
            this.currentSelected = e.target;

            this.dispatchEvent(new CustomEvent<SelectEvent>("select", { detail: { id: e.target.id || e.target.text }}));
        }
    }
    private handleancestorselect = (e:Event) => {
        if (e instanceof CustomEvent && e.target instanceof Item)     
        {
            const childtarget = e.detail as Item;
            if (e.target !== this.currentAncestorSelected) 
            {
                this.currentAncestorSelected?.deselect();
            }
            if (childtarget !== this.currentSelected)
            {
                this.currentSelected?.deselect();
                this.currentSelected = childtarget;

                this.dispatchEvent(new CustomEvent<SelectEvent>("select", { detail: { id: childtarget.id || childtarget.text }}));
            }
            this.currentAncestorSelected = e.target;
        }
    }

    render() {
        return html`
            <pap-box-template radius="medium">
                <header>
                    <pap-icon class="logo light" style="width:124px" size="large" name="interzero-logo"></pap-icon>
                    <pap-icon class="logo dark" style="width:124px" size="large" name="interzero-logo-dark"></pap-icon>
                    <pap-button color="secondary" circle variant="clear" @click="${this.handlehamburgerclick}">
                        <!-- <pap-icon customSize="32" class="hover" name="circular-logo"></pap-icon> -->
                        <pap-icon size="small" class="open" name="hamburger.open"></pap-icon>
                        <!-- <pap-icon size="small" class="collapsed" name="hamburger.collapse"></pap-icon> -->
                    </pap-button>
                </header>
                <pap-divider></pap-divider>
                <div class="body">
                    <slot @slotchange="${this.handleslotchange}"></slot>
                </div>
            </pap-box-template>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "pap-sidebar": Sidebar;
    }
}

## STYLE-CODE

// light mode (system)
@media (prefers-color-scheme: light) {
    :host {
        pap-icon.logo.dark {
            display: none;
        }
        pap-icon.logo.light {
            display: initial;
        }
    }
}
// dark mode (system)
@media (prefers-color-scheme: dark) {
    :host {
        pap-icon.logo.dark {
            display: initial;
        }
        pap-icon.logo.light {
            display: none;
        }
    }
}
:host(.theme-dark) {
    pap-icon.logo.dark {
        display: initial;
    }
    pap-icon.logo.light {
        display: none;
    }
}
:host(.theme-light) {
    pap-icon.logo.dark {
        display: none;
    }
    pap-icon.logo.light {
        display: initial;
    }
}

:host {
    position: sticky;
    top: 0;
    left: 0;
    display: grid;
    height: 100vh;
    z-index: 1;
    // min-height: 100vh;
    grid-template-rows: 1fr;

    pap-box-template {
        container-type: inline-size;
        display: block;
        background-color: var(--pap-sidebar-background-color, var(--pap-color-bg, #FFFFFF));
        // padding: var(--padding-small, 8px);
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        overflow-y: auto;

        header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: var(--margin-small, 8px);
            padding-block: var(--padding-small, 8px);
            padding: var(--padding-small, 8px);
            padding-bottom: 0;

            pap-icon.logo {
                margin-left: var(--margin-medium, 16px);
            }
        }
    
        pap-divider {
            padding-inline: var(--padding-small, 8px);
            margin-block: var(--margin-small, 8px);
        }
    
        div.body {
            padding: var(--padding-small, 8px);
            padding-left: 0;

            ::slotted(pap-sidebar-item) {
                margin-bottom: var(--margin-smaller, 4px);
            }
        }
    }
}

:host([mode="open"]) {
    width: 310px;
}
:host([mode="collapsed"]) {
    width: 3.5rem;
}

:host([mode="hover"]) {
    width: 3.5rem;
    z-index: 1000;

    pap-box-template {
        position: absolute;

        &:hover {
            width: 310px;
            transition: width 60ms ease-in;
        }
        &:not(:hover) {
            box-shadow: none !important;
        }

        // header {
        //     pap-button {
        //         pap-icon.open {
        //             display: none;
        //         }
        //         pap-icon.collapsed {
        //             display: block;
        //         }
        //         pap-icon.hover {
        //             display: none;
        //         }
        //     }
        // }
    }
}

@container (min-width: 3.5rem) {
    :host {
        pap-box-template {
            transition: width 60ms ease-in;
            // header {
            //     pap-button {
            //         pap-icon.open {
            //             display: block;
            //         }
            //         pap-icon.collapsed {
            //             display: none;
            //         }
            //         pap-icon.hover {
            //             display: none;
            //         }
            //     }
            // }
        }
    }
}
@container (max-width: 3.5rem) {
    :host {
        pap-box-template {
            transition: width 150ms ease-in;

            header {
                justify-content: center;

                ::slotted(*) {
                    display: none;
                }
                pap-icon.logo.dark,
                pap-icon.logo.light {
                    display: none !important;
                }
                // pap-button {
                //     pap-icon.open {
                //         display: none;
                //     }
                //     pap-icon.collapsed {
                //         display: none !important;
                //     }
                //     pap-icon.hover {
                //         display: block !important;
                //     }
                // }
            }
        }
    }
}
