PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
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
import { Item } from "./components/item";

export class Sidebar extends BaseTemplate {
    static style = style;

    @property({ rerender: false }) mode:Mode = "open";
    @property({ onUpdate: "updateSelected" }) selected?:string;

    @query('o-box-template') boxtemplateElement!: BoxTemplate;
    
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
            <o-box-template radius="medium">
                <header>
                    <o-icon class="logo light" style="width:124px" size="large" name="interzero-logo"></o-icon>
                    <o-icon class="logo dark" style="width:124px" size="large" name="interzero-logo-dark"></o-icon>
                    <o-button color="secondary" circle variant="clear" @click="${this.handlehamburgerclick}">
                        <!-- <o-icon customSize="32" class="hover" name="circular-logo"></o-icon> -->
                        <o-icon size="small" class="open" name="hamburger.open"></o-icon>
                        <!-- <o-icon size="small" class="collapsed" name="hamburger.collapse"></o-icon> -->
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
        "o-sidebar": Sidebar;
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
    z-index: 1;
    // min-height: 100vh;
    grid-template-rows: 1fr;
    
    o-box-template {
        container-type: inline-size;
        display: block;
        background-color: var(--o-sidebar-background-color, var(--o-color-bg, #FFFFFF));
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

            o-icon.logo {
                margin-left: var(--margin-medium, 16px);
            }
        }
    
        o-divider {
            padding-inline: var(--padding-small, 8px);
            margin-block: var(--margin-small, 8px);
        }
    
        div.body {
            padding: var(--padding-small, 8px);
            padding-left: 0;

            ::slotted(o-sidebar-item) {
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
    
    o-box-template {
        position: absolute;

        &:hover {
            width: 310px;
            transition: width 60ms ease-in;
        }
        &:not(:hover) {
            box-shadow: none !important;
        }

        // header {
        //     o-button {
        //         o-icon.open {
        //             display: none;
        //         }
        //         o-icon.collapsed {
        //             display: block;
        //         }
        //         o-icon.hover {
        //             display: none;
        //         }
        //     }
        // }
    }
}

@container (min-width: 3.5rem) {
    :host {
        o-box-template {
            transition: width 60ms ease-in;
            // header {
            //     o-button {
            //         o-icon.open {
            //             display: block;
            //         }
            //         o-icon.collapsed {
            //             display: none;
            //         }
            //         o-icon.hover {
            //             display: none;
            //         }
            //     }
            // }
        }
    }
}
@container (max-width: 3.5rem) {
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
                // o-button {
                //     o-icon.open {
                //         display: none;
                //     }
                //     o-icon.collapsed {
                //         display: none !important;
                //     }
                //     o-icon.hover {
                //         display: block !important;
                //     }
                // }
            }
        }
    }
}