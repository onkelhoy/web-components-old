# Navbar

Atomic Type: molecules

Version: 1.0.0

## Development 
Development servers can be started and should all exist inside `"views"` folder

## Scripts 
PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and register code provided to you - could you create a rather simple introduction text with maybe a code example how to use in html - keep it very simple. Do not give example how to run the register code it's already included (this is for you so you can see the element-tag)! The introduction should be read by developers so it needs not to be simple enough for beginners!

## SOURCE-CODE:
// utils 
import { html, property, query } from "@henry2/tools-utils";
import "@henry2/tools-translator/wc";

// atoms 
import "@henry2/button/wc";
import "@henry2/icon/wc";
import "@henry2/divider/wc";
import "@henry2/typography/wc";

// templates
import { BoxTemplate } from "@henry2/templates-box";
import { BaseTemplate } from "@henry2/templates-base";
import '@henry2/templates-box/wc'

// local 
import { style } from "./style";
import { Mode, SelectEvent } from "./types";
import { NavbarItem } from "./components/navbar-item";

export class Navbar extends BaseTemplate {
    static style = style;

    @property({ rerender: false }) mode:Mode = "open";
    @property({ onUpdate: "updateSelected" }) selected?:string;

    @query('o-box-template') boxtemplateElement!: BoxTemplate;
    
    private items: Array<NavbarItem> = [];
    private currentSelected?: NavbarItem;
    private currentAncestorSelected?: NavbarItem;

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
            this.mode = "collapsed";
        }
        else if (this.mode === "collapsed")
        {
            this.mode = "hover";
            if (this.boxtemplateElement) this.boxtemplateElement.elevation = "medium"
        }
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
                if (element instanceof NavbarItem)
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
        if (e.target instanceof NavbarItem) 
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
        if (e instanceof CustomEvent && e.target instanceof NavbarItem)     
        {
            const childtarget = e.detail as NavbarItem;
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
            <o-box-template radius="medium">
                <header>
                    <o-icon class="logo light" style="width:124px" size="large" name="interzero-logo"></o-icon>
                    <o-icon class="logo dark" style="width:124px" size="large" name="interzero-logo-dark"></o-icon>
                    <o-button variant="clear" @click="${this.handlehamburgerclick}">
                        <o-icon customSize="32" class="hover" name="circular-logo"></o-icon>
                        <o-icon size="small" class="open" name="hamburger.open"></o-icon>
                        <o-icon size="small" class="collapsed" name="hamburger.collapse"></o-icon>
                    </o-button>
                </header>
                <o-divider></o-divider>
                <div class="body">
                    <slot @slotchange="${this.handleslotchange}"></slot>
                </div>
            </o-box-template>
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "o-navbar": Navbar;
    }
}
## REGISTER-CODE:
import { NavbarItem } from './components/navbar-item';
import { Navbar } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('o-navbar')) {
  cElements.define('o-navbar', Navbar);
}
if (!cElements.get('o-navbar-item')) {
  cElements.define('o-navbar-item', NavbarItem);
}
PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and the types can you give me the following tables. 
1. properties (columns: name, default-value, type, description) 
2. events (columns: name - ex: 'click', type - ex: CustomEvent<ClickEvent>, description - when its being triggered etc) 
3.public functions (columns: name, arguments - ex: arg1:CustomType, arg2?: boolean = true, arg3?: string, description - breif explenation what it does)

## SOURCE-CODE:
 // utils 
import { html, property, query } from "@henry2/tools-utils";
import "@henry2/tools-translator/wc";

// atoms 
import "@henry2/button/wc";
import "@henry2/icon/wc";
import "@henry2/divider/wc";
import "@henry2/typography/wc";

// templates
import { BoxTemplate } from "@henry2/templates-box";
import { BaseTemplate } from "@henry2/templates-base";
import '@henry2/templates-box/wc'

// local 
import { style } from "./style";
import { Mode, SelectEvent } from "./types";
import { NavbarItem } from "./components/navbar-item";

export class Navbar extends BaseTemplate {
    static style = style;

    @property({ rerender: false }) mode:Mode = "open";
    @property({ onUpdate: "updateSelected" }) selected?:string;

    @query('o-box-template') boxtemplateElement!: BoxTemplate;
    
    private items: Array<NavbarItem> = [];
    private currentSelected?: NavbarItem;
    private currentAncestorSelected?: NavbarItem;

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
            this.mode = "collapsed";
        }
        else if (this.mode === "collapsed")
        {
            this.mode = "hover";
            if (this.boxtemplateElement) this.boxtemplateElement.elevation = "medium"
        }
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
                if (element instanceof NavbarItem)
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
        if (e.target instanceof NavbarItem) 
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
        if (e instanceof CustomEvent && e.target instanceof NavbarItem)     
        {
            const childtarget = e.detail as NavbarItem;
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
            <o-box-template radius="medium">
                <header>
                    <o-icon class="logo light" style="width:124px" size="large" name="interzero-logo"></o-icon>
                    <o-icon class="logo dark" style="width:124px" size="large" name="interzero-logo-dark"></o-icon>
                    <o-button variant="clear" @click="${this.handlehamburgerclick}">
                        <o-icon customSize="32" class="hover" name="circular-logo"></o-icon>
                        <o-icon size="small" class="open" name="hamburger.open"></o-icon>
                        <o-icon size="small" class="collapsed" name="hamburger.collapse"></o-icon>
                    </o-button>
                </header>
                <o-divider></o-divider>
                <div class="body">
                    <slot @slotchange="${this.handleslotchange}"></slot>
                </div>
            </o-box-template>
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "o-navbar": Navbar;
    }
}

## TYPE-CODE: export type SelectEvent = { id: string };

export type Mode = "open" | "collapsed" | "hover";PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and style code probided. Can you create a documentation that includes titles, short descrition and the table for each tables: css-variables, parts, slots.
css-variables should be a table with columns: (name, default-value, type - ex. CSS unit, description).
parts should include all elements that have been exposed with the part attribute ex: <p part='foo'> - and the table should then include columns: (name, description (short)).
slots should include columns: (name, default-value, description)

## SOURCE-CODE:
// utils 
import { html, property, query } from "@henry2/tools-utils";
import "@henry2/tools-translator/wc";

// atoms 
import "@henry2/button/wc";
import "@henry2/icon/wc";
import "@henry2/divider/wc";
import "@henry2/typography/wc";

// templates
import { BoxTemplate } from "@henry2/templates-box";
import { BaseTemplate } from "@henry2/templates-base";
import '@henry2/templates-box/wc'

// local 
import { style } from "./style";
import { Mode, SelectEvent } from "./types";
import { NavbarItem } from "./components/navbar-item";

export class Navbar extends BaseTemplate {
    static style = style;

    @property({ rerender: false }) mode:Mode = "open";
    @property({ onUpdate: "updateSelected" }) selected?:string;

    @query('o-box-template') boxtemplateElement!: BoxTemplate;
    
    private items: Array<NavbarItem> = [];
    private currentSelected?: NavbarItem;
    private currentAncestorSelected?: NavbarItem;

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
            this.mode = "collapsed";
        }
        else if (this.mode === "collapsed")
        {
            this.mode = "hover";
            if (this.boxtemplateElement) this.boxtemplateElement.elevation = "medium"
        }
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
                if (element instanceof NavbarItem)
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
        if (e.target instanceof NavbarItem) 
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
        if (e instanceof CustomEvent && e.target instanceof NavbarItem)     
        {
            const childtarget = e.detail as NavbarItem;
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
            <o-box-template radius="medium">
                <header>
                    <o-icon class="logo light" style="width:124px" size="large" name="interzero-logo"></o-icon>
                    <o-icon class="logo dark" style="width:124px" size="large" name="interzero-logo-dark"></o-icon>
                    <o-button variant="clear" @click="${this.handlehamburgerclick}">
                        <o-icon customSize="32" class="hover" name="circular-logo"></o-icon>
                        <o-icon size="small" class="open" name="hamburger.open"></o-icon>
                        <o-icon size="small" class="collapsed" name="hamburger.collapse"></o-icon>
                    </o-button>
                </header>
                <o-divider></o-divider>
                <div class="body">
                    <slot @slotchange="${this.handleslotchange}"></slot>
                </div>
            </o-box-template>
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "o-navbar": Navbar;
    }
}
## STYLE-CODE:
// light mode (system)
@media (prefers-color-scheme: light) {
    :host {
        o-icon.logo.dark {
            display: none;
        }
        o-icon.logo.light {
            display: initial;
        }
    }
}
// dark mode (system)
@media (prefers-color-scheme: dark) {
    :host {
        o-icon.logo.dark {
            display: initial;
        }
        o-icon.logo.light {
            display: none;
        }
    }
}
:host(.theme-dark) {
    o-icon.logo.dark {
        display: initial;
    }
    o-icon.logo.light {
        display: none;
    }
}
:host(.theme-light) {
    o-icon.logo.dark {
        display: none;
    }
    o-icon.logo.light {
        display: initial;
    }
}

:host {    
    position: sticky;
    top: 0;
    left: 0;
    display: grid;
    height: 100vh;
    // min-height: 100vh;
    grid-template-rows: 1fr;
    
    o-box-template {
        container-type: inline-size;
        display: block;
        background-color: var(--o-navbar-background-color, var(--o-color-bg, #FFFFFF));
        padding: var(--padding-small, 8px);
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

            o-icon.logo {
                margin-left: var(--margin-medium, 16px);
            }

            o-button {
                gap: 0;
                padding: 0;
                width: 40px;
                height: 40px;

                color: var(--o-color-text);
            }
        }
    
        o-divider {
            margin-block: var(--margin-small, 8px);
        }
    
        div.body {
            ::slotted(o-navbar-item) {
                margin-bottom: var(--margin-small, 8px);
            }
        }
    }
}

:host([mode="open"]) {
    width: 310px;
}
:host([mode="collapsed"]) {
    width: 72px;
}

:host([mode="hover"]) {    
    width: 72px;
    
    o-box-template {
        position: absolute;

        &:hover {
            width: 310px;
            transition: width 60ms ease-in;
        }

        header {
            o-button {
                o-icon.open {
                    display: none;
                }
                o-icon.collapsed {
                    display: block;
                }
                o-icon.hover {
                    display: none;
                }
            }
        }
    }
}

@container (min-width: 72px) {
    :host {
        o-box-template {
            transition: width 60ms ease-in;
            
            header {
                o-button {
                    o-icon.open {
                        display: block;
                    }
                    o-icon.collapsed {
                        display: none;
                    }
                    o-icon.hover {
                        display: none;
                    }
                }
            }
        }
    }
}
@container (max-width: 72px) {
    :host {
        o-box-template {
            transition: width 150ms ease-in;

            header {
                justify-content: center;

                ::slotted(*) {
                    display: none;
                }
                o-icon.logo.dark,
                o-icon.logo.light {
                    display: none !important;
                }
                o-button {
                    o-icon.open {
                        display: none;
                    }
                    o-icon.collapsed {
                        display: none !important;
                    }
                    o-icon.hover {
                        display: block !important;
                    }
                }
            }
        }
    }
}