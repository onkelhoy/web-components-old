// system 
import { html, property, query } from "@pap-it/system-utils";
import { Base } from "@pap-it/system-base";

// atoms 
import { Menu, Item } from '@pap-it/menu';
import "@pap-it/menu/wc";
import "@pap-it/typography/wc";

// tools
import { THEMECHANGE_NAME, THEMEADD_NAME } from "@pap-it/tools-theme";
import "@pap-it/tools-translator/wc";

// local
import { style } from "./style";

export class ThemeMenu extends Base {
  static style = style;

  @query('span[slot].theme-color') themecolorElement!: HTMLSpanElement;
  @query('template') templateElement!: HTMLTemplateElement;
  @query({ selector: 'pap-menu', onload: 'onloadmenu' }) menuElement!: Menu;

  // class functions
  connectedCallback() {
    super.connectedCallback();

    // register event 
    window.addEventListener(THEMECHANGE_NAME, this.handlethemechange);
    window.addEventListener(THEMEADD_NAME, this.handlethemeadd);
  }
  disconnectedCallback() {
    super.disconnectedCallback();

    // remove event listener
    window.removeEventListener(THEMECHANGE_NAME, this.handlethemechange);
    window.removeEventListener(THEMEADD_NAME, this.handlethemeadd);
  }

  // onload functions
  private onloadmenu = () => {
    this.handlethemeadd();
    this.handlethemechange();

    setTimeout(() => {
      this.menuElement.value = window.papTheme.current;
    }, 100);
  }

  // event handlers 
  private handlethemeadd = () => {
    if (!this.menuElement) return;
    if (!this.templateElement) return;
    if (!this.themecolorElement) return;

    if (window.papTheme.map.size <= 1) {
      this.menuElement.setAttribute('hidden', 'true');
      return;
    }
    else if (this.menuElement.hasAttribute('hidden')) {
      this.menuElement.removeAttribute('hidden');
    }

    const items = this.menuElement.querySelectorAll<Item>("pap-menu-item");
    const assigned = new Set<string>();
    items.forEach(item => {
      if (!window.papTheme.map.has(item.value)) {
        this.menuElement.removeChild(item);
      }
      else {
        assigned.add(item.value);
      }
    });

    Array.from(window.papTheme.map).forEach(([name, config]) => {
      if (!assigned.has(name)) {
        const newitem = this.templateElement.content.cloneNode(true) as HTMLElement;

        const itemElement = newitem.querySelector<Item>('pap-menu-item');
        if (itemElement) {
          itemElement.setAttribute('value', name);
        }

        const spanElement = newitem.querySelector("span");
        if (spanElement) spanElement.style.backgroundColor = config.representColor;

        const typographyElement = newitem.querySelector("pap-typography");
        if (typographyElement) typographyElement.innerHTML = config.name

        this.menuElement.appendChild(newitem);
      }
    })
  }
  private handlethemechange = () => {
    if (this.menuElement) {
      const config = window.papTheme.map.get(window.papTheme.current);
      if (config) {
        this.themecolorElement.style.backgroundColor = config.representColor;
        this.menuElement.value = window.papTheme.current;
      }
    }
  }
  private handleselect = (e: Event) => {
    const menu = e.target as Menu;
    if (menu && menu.value) {
      if (window.papTheme.current !== menu.value) {
        window.papTheme.change(menu.value);
      }
    }
  }

  render() {
    return html`
      <template>
        <pap-menu-item>
          <span slot="prefix" class="theme-color"></span>
          <pap-typography></pap-typography>
        </pap-menu-item>
      </template>
      
      <pap-menu 
        placement="bottom-left" 
        buttonRadius="circular" 
        @select="${this.handleselect}"
      >
        <span slot="button-prefix" class="theme-color"></span>
        <pap-typography slot="button-content" class="theme-name"><pap-translator>Theme</pap-translator></pap-typography>
      </pap-menu>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pap-theme-menu": ThemeMenu;
  }
}