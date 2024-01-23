// system 
import { html, property, query } from "@pap-it/system-utils";
import { BaseSystem } from "@pap-it/system-base";

// atoms 
import { Menu, MenuItem } from '@pap-it/menu';
import { Toggle } from '@pap-it/toggle';
import "@pap-it/menu/wc";
import "@pap-it/typography/wc";
import "@pap-it/toggle/wc";
import "@pap-it/icon/wc";

// tools
import { change as ChangeTheme, THEMECHANGE_NAME, THEMEADD_NAME } from "@pap-it/tools-theme";
import "@pap-it/tools-translator/wc";

import { style } from "./style";
type LightDarkTheme = "light" | "dark";

export class Theme extends BaseSystem {
  static style = style;

  @query('span[slot].theme-color') themecolorElement!: HTMLSpanElement;
  @query('template') templateElement!: HTMLTemplateElement;
  @query('pap-toggle') toggleElement!: Toggle;
  @query({ selector: 'pap-menu', onload: 'onloadmenu' }) menuElement!: Menu;

  // class functions
  connectedCallback() {
    super.connectedCallback();

    if (!window.sessionStorage.getItem("pap-lightdarktheme")) {
      this.setlightdark(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    }

    // register event 
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", this.handleprefercolorchange);
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
      this.menuElement.value = window.oTheme.current;
    }, 100);
  }

  // private functions 
  private setlightdark(value: LightDarkTheme) {
    window.sessionStorage.setItem("pap-lightdarktheme", value);
    window.dispatchEvent(new CustomEvent("theme-appearance-change", { detail: { value } }));
    document.documentElement.classList.remove('theme-light', 'theme-dark');
    document.documentElement.classList.add(`theme-${value}`);
  }

  // event handlers 
  private handleprefercolorchange = (e: MediaQueryListEvent) => {
    if (this.toggleElement) {
      this.toggleElement.value = e.matches.toString();
    }
  }
  private handlethemeadd = () => {
    if (!this.menuElement) return;
    if (!this.templateElement) return;
    if (!this.themecolorElement) return;

    if (window.oTheme.map.size <= 1) {
      this.menuElement.setAttribute('hidden', 'true');
      return;
    }
    else if (this.menuElement.hasAttribute('hidden')) {
      this.menuElement.removeAttribute('hidden');
    }

    const items = this.menuElement.querySelectorAll<MenuItem>("pap-menu-item");
    const assigned = new Set<string>();
    items.forEach(item => {
      if (!window.oTheme.map.has(item.value)) {
        this.menuElement.removeChild(item);
      }
      else {
        assigned.add(item.value);
      }
    });

    Array.from(window.oTheme.map).forEach(([name, config]) => {
      if (!assigned.has(name)) {
        const newitem = this.templateElement.content.cloneNode(true) as HTMLElement;

        const itemElement = newitem.querySelector<MenuItem>('pap-menu-item');
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
      const config = window.oTheme.map.get(window.oTheme.current);
      if (config) {
        this.themecolorElement.style.backgroundColor = config.representColor;
        this.menuElement.value = window.oTheme.current;
      }
    }
  }
  private handleselect = (e: Event) => {
    const menu = e.target as Menu;
    if (menu) {
      if (window.oTheme.current !== menu.value) {
        window.oTheme.change(menu.value);
      }
    }
  }
  private handlechange = (e: Event) => {
    const toggle = e.target as Toggle;
    if (toggle) {
      this.setlightdark(toggle.checked ? "dark" : "light");
    }
  }

  render() {
    return html`
      <template>
        <pap-menu-item>
          <span class="theme-color"></span>
          <pap-typography></pap-typography>
        </pap-menu-item>
      </template>

      <pap-toggle value="${window.sessionStorage.getItem("pap-lightdarktheme") === "dark" ? "true" : "false"}" @change="${this.handlechange}">
        <pap-icon name="light-mode"></pap-icon>
        <pap-icon name="dark-mode"></pap-icon>
      </pap-toggle>

      <pap-menu buttonRadius="circular" placement="bottom-left" @select="${this.handleselect}">
        <span slot="button-prefix" class="theme-color"></span>
        <pap-typography slot="button-content" class="theme-name"><pap-translator>Theme</pap-translator></pap-typography>
      </pap-menu>
    `
  }
}