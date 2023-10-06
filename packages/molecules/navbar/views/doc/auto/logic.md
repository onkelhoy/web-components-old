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

export type Mode = "open" | "collapsed" | "hover";