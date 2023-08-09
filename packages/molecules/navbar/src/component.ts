// utils 
import { html, property, query } from "@onkelhoy/tools-utils";
import "@onkelhoy/tools-translator/wc";

// atoms 
import "@onkelhoy/button/wc";
import "@onkelhoy/icon/wc";
import "@onkelhoy/divider/wc";
import "@onkelhoy/typography/wc";

// templates
import { BoxTemplate } from "@onkelhoy/templates-box";
import { BaseTemplate } from "@onkelhoy/templates-base";
import '@onkelhoy/templates-box/wc'

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
                    <o-icon class="logo" style="width:124px" size="large" name="interzero-logo"></o-icon>
                    <o-button @click="${this.handlehamburgerclick}">
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