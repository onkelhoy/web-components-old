PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and style code probided. Can you create a documentation that includes titles, short descrition and the table for each tables: css-variables, parts, slots.
css-variables should be a table with columns: (name, default-value, type - ex. CSS unit, description).
parts should include all elements that have been exposed with the part attribute ex: <p part='foo'> - and the table should then include columns: (name, description (short)).
slots should include columns: (name, default-value, description)

## SOURCE-CODE:
// utils 
import { html, property, Size, Radius } from "@pap-it/system-utils";

// atoms
import { ButtonVariant, ButtonColorVariant } from "@pap-it/button";
import "@pap-it/icon/wc";
import "@pap-it/button/wc";

// templates
import { BaseSystem } from "@pap-it/system-base";
import { Placement } from "@pap-it/templates-popover";
import "@pap-it/templates-popover/wc";
import "@pap-it/templates-box/wc";

// local 
import { style } from "./style";
import { MenuItem } from "./components/menu-item";

export class Menu extends BaseSystem {
  static style = style;

  @property({ rerender: false, type: Boolean }) open: boolean = false;
  @property() placement: Placement = "bottom-center";
  @property() size: Size = "medium";

  @property() buttonVariant: ButtonVariant = "clear";
  @property() buttonColor: ButtonColorVariant = "secondary";
  @property() buttonRadius: Radius = "medium";

  private current?: MenuItem;
  private items: MenuItem[] = [];

  // public functions
  // NOTE problem with value as I need to access it via attributes...
  public get value() {
    return this.current?.getvalue() || '';
  }
  public set value(value: string) {
    const item = this.items.find(i => i.getvalue() === value);
    if (item) {
      item.click();
    }
  }
  public get text() {
    return this.current?.gettext();
  }

  // event handlers
  private handleslotchange = (e: Event) => {
    if (e.target instanceof HTMLSlotElement) {
      const items = e.target.assignedElements();
      items.forEach(item => {
        if (item instanceof MenuItem) {
          if (!item.hasAttribute('data-menu-init')) {
            item.addEventListener('select', this.handleitemselected);
            item.setAttribute('data-menu-init', 'true');
            this.items.push(item);
          }
        }
      })
    }
  }
  private handleitemselected = (e: Event) => {
    if (e.target instanceof MenuItem) {
      if (this.current && e.target !== this.current) {
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
      <pap-popover-template @hide="${this.handlehide}" @show="${this.handleshow}" revealby="click" hideonoutsideclick placement="${this.placement}">
        <pap-button 
          variant="${this.buttonVariant}" 
          color="${this.buttonColor}" 
          radius="${this.buttonRadius}" 
          part="button" 
          slot="target" 
          size="${this.size}"
        >
          <slot name="button-prefix" slot="prefix"></slot>
          <slot name="button-content"></slot>
          <slot name="button-suffix" slot="suffix">
            <pap-icon customSize="15" name="caret">v</pap-icon>
          </slot>
        </pap-button>
        <pap-box-template part="box" class="options" radius="small" elevation="small">
          <slot @slotchange="${this.handleslotchange}">
            <pap-menu-item>Missing Items</pap-menu-item>
          </slot>
        </pap-box-template>
      </pap-popover-template>
    `
  }
}


declare global {
  interface HTMLElementTagNameMap {
    "pap-menu": Menu;
  }
}
## STYLE-CODE:
:host {
    --menu-background: var(--pap-color-bg, #FFFFFF);
    --menu-color: var(--pap-color-text, #29292F);
    display: inline-block;

    pap-button {
        span.caret-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    pap-popover-template {
        display: inline-block;
    }

    pap-box-template {
        display: block;
        // padding: 1rem 1.5rem;
        padding-block: var(--padding-small, 8px);
        min-width: 180px;
        background-color: var(--menu-background);
        max-height: 20rem;
        overflow-y: auto;
    }
}

:host([open="true"]) {
    pap-button {
        pap-icon[name="caret"] {
            transform: rotate(180deg);
        }
    }
}
:host([open="false"]) {
    pap-button {
        pap-icon[name="caret"] {
            transform: rotate(0);
        }
    }
}