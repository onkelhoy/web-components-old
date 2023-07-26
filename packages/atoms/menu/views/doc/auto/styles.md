PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and style code probided. Can you create a documentation that includes titles, short descrition and the table for each tables: css-variables, parts, slots.
css-variables should be a table with columns: (name, default-value, type - ex. CSS unit, description).
parts should include all elements that have been exposed with the part attribute ex: <p part='foo'> - and the table should then include columns: (name, description (short)).
slots should include columns: (name, default-value, description)

## SOURCE-CODE:
// utils 
import { html, property } from "@circular-tools/utils";

// atoms
import "@circular/icon/wc";
import "@circular/button/wc";

// templates
import { BaseTemplate } from "@circular-templates/base";
import { Placement } from "@circular-templates/popover";
import "@circular-templates/popover/wc";
import "@circular-templates/box/wc";

// local 
import { style } from "./style";
import { MenuItem } from "./components/menu-item";

export class Menu extends BaseTemplate {
    static style = style;

    @property({ rerender: false, type: Boolean }) open: boolean = false;
    @property() placement: Placement = "bottom-center";

    private current?: MenuItem;
    private items: MenuItem[] = [];

    // public functions
    // NOTE problem with value as I need to access it via attributes...
    public get value () {
        return this.current?.getvalue() || '';
    }
    public set value (value:string) {
        const item = this.items.find(i => i.getvalue() === value);
        if (item)
        {
            item.click();
        }
    }
    public get text () {
        return this.current?.gettext();
    }

    // event handlers
    private handleslotchange = (e:Event) => {
        if (e.target instanceof HTMLSlotElement)
        {
            const items = e.target.assignedElements();
            items.forEach(item => {
                if (item instanceof MenuItem)
                {
                    if (!item.hasAttribute('data-menu-init'))
                    {
                        item.addEventListener('select', this.handleitemselected);
                        item.setAttribute('data-menu-init', 'true');
                        this.items.push(item);
                    }
                }
            })
        }
    }
    private handleitemselected = (e:Event) => {
        if (e.target instanceof MenuItem)
        {
            if (this.current && e.target !== this.current)
            {
                this.current.checked = false;
            }
            this.current = e.target;
            this.dispatchEvent(new Event('select'));
        }
    }
    private handlehide = () => {
        this.open = false;
    }
    private handleshow = () => {
        this.open = true;
    }

    render() {
        return html`
            <o-popover-template @hide="${this.handlehide}" @show="${this.handleshow}" revealby="click" hideonoutsideclick placement="${this.placement}">
                <o-button part="button" slot="target" size="large">
                    <slot name="button-prefix" slot="prefix"></slot>
                    <slot name="button-content"></slot>
                    <slot name="button-suffix" slot="suffix">
                        <span class="caret-wrapper">
                            <o-icon customSize="15" name="caret">v</o-icon>
                        </span>
                    </slot>
                </o-button>
                <o-box-template part="box" class="options" radius="small" elevation="small">
                    <slot @slotchange="${this.handleslotchange}">
                        <o-menu-item>Missing Items</o-menu-item>
                    </slot>
                </o-box-template>
            </o-popover-template>
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "o-menu": Menu;
    }
}
## STYLE-CODE:
:host {
    --background: var(--o-color-white);
    --color: var(--o-color-black);

    o-button {
        background-color: var(--background);
        color: var(--color);
        padding: var(--padding-small, 8px);
        gap: var(--padding-small, 8px);

        span.caret-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 40px;
            height: 40px;
        }
    }

    o-popover-template {
        display: inline-block;
    }

    o-box-template {
        display: block;
        // padding: 1rem 1.5rem;
        padding-block: var(--padding-small);
        min-width: 180px;
        background-color: var(--background);
        max-height: 20rem;
        overflow-y: auto;
    }
}

:host([open="true"]) {
    o-button {
        o-icon[name="caret"] {
            transform: rotate(180deg);
        }
    }
}
:host([open="false"]) {
    o-button {
        o-icon[name="caret"] {
            transform: rotate(0);
        }
    }
}