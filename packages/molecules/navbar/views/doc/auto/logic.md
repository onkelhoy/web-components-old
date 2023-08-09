PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and the types can you give me the following tables. 
1. properties (columns: name, default-value, type, description) 
2. events (columns: name - ex: 'click', type - ex: CustomEvent<ClickEvent>, description - when its being triggered etc) 
3.public functions (columns: name, arguments - ex: arg1:CustomType, arg2?: boolean = true, arg3?: string, description - breif explenation what it does)

## SOURCE-CODE:
 // utils 
import { html, property } from "@onkelhoy/tools-utils";
import "@onkelhoy/tools-translator/wc";

// atoms 
import "@onkelhoy/button/wc";
import "@onkelhoy/icon/wc";
import "@onkelhoy/divider/wc";
import "@onkelhoy/typography/wc";

// templates
import { BaseTemplate } from "@onkelhoy/templates-base";

// local 
import { style } from "./style";
import { Item } from "./types";

export class Navbar extends BaseTemplate {
    static style = style;

    @property({ type: Boolean, rerender: false }) open:boolean = true;

    private handlehamburgerclick = () => {
        this.open = !this.open;
        this.dispatchEvent(new Event("change"));
    }

    render() {
        return html`
            <section>
                <header>
                    <slot name="header">
                        <o-icon style="width:124px" size="large" name="interzero-logo"></o-icon>
                        <o-icon customSize="32" name="circular-logo"></o-icon>
                    </slot>
                    <o-button @click="${this.handlehamburgerclick}">
                        <o-icon size="large" class="closed" name="sidemenu-hamburger"></o-icon>
                        <o-icon size="large" class="open" name="sidemenu-hamburger-open"></o-icon>
                    </o-button>
                </header>
                <o-divider></o-divider>
                <div class="body">
                    <slot></slot>
                </div>
            </section>
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "o-navbar": Navbar;
    }
}

## TYPE-CODE: export type SubItem = { id: string; text: string };
export type Item = SubItem & {
  icon: string;
  selected_icon: string;
  subitems: string[]; // this locks it to only 1 level
}