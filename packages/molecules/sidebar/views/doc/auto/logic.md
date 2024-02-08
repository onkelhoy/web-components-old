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
import { Box } from "@pap-it/templates-box";
import { Base } from "@pap-it/system-base";
import '@pap-it/templates-box/wc'

// local
import { style } from "./style";
import { Mode, SelectEvent } from "./types";
import { Item } from "./components/item";

export class Sidebar extends Base {
    static style = style;

    @property({ rerender: false }) mode:Mode = "open";
    @property({ onUpdate: "updateSelected" }) selected?:string;

    @query('pap-box-template') boxtemplateElement!: Box;
    
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
                        <!-- <pap-icon custom-size="32" class="hover" name="circular-logo"></pap-icon> -->
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

export type Mode = "open" | "collapsed" | "hover";
