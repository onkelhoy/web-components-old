// utils 
import { html, property, query } from "@henry2/tools-utils";
import { change as ChangeTheme, THEMECHANGE_NAME, THEMEADD_NAME } from "@henry2/tools-theme";
import "@henry2/tools-translator/wc";

// atoms 
import { Menu, MenuItem } from '@henry2/menu';
import { Toggle } from '@henry2/toggle';
import "@henry2/menu/wc";
import "@henry2/typography/wc";
import "@henry2/toggle/wc";
import "@henry2/icon/wc";

// templates
import { BaseTemplate } from "@henry2/templates-base";

import { style } from "./style";
type LightDarkTheme = "light" | "dark";

export class Theme extends BaseTemplate {
  static style = style;

  @query('span[slot].theme-color') themecolorElement!: HTMLSpanElement;
  @query('template') templateElement!: HTMLTemplateElement;
  @query('o-toggle') toggleElement!: Toggle;
  @query({ selector:'o-menu', onload: 'onloadmenu' }) menuElement!: Menu;

  // class functions
  connectedCallback() {
    super.connectedCallback();

    if (!window.sessionStorage.getItem("o-lightdarktheme"))
    {
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
    window.sessionStorage.setItem("o-lightdarktheme", value);
    window.dispatchEvent(new CustomEvent("theme-appearance-change", { detail: { value } }));
    document.documentElement.classList.remove('theme-light', 'theme-dark');
    document.documentElement.classList.add(`theme-${value}`);
  }

  // event handlers 
  private handleprefercolorchange = (e:MediaQueryListEvent) => {
    if (this.toggleElement)
    {
      this.toggleElement.value = e.matches.toString();
    }
  }
  private handlethemeadd = () => {
    if (!this.menuElement) return;
    if (!this.templateElement) return;
    if (!this.themecolorElement) return;

    if (window.oTheme.map.size <= 1)
    {
      this.menuElement.setAttribute('hidden', 'true');
      return;
    }
    else if (this.menuElement.hasAttribute('hidden'))
    {
      this.menuElement.removeAttribute('hidden');
    }
  
    const items = this.menuElement.querySelectorAll<MenuItem>("o-menu-item");
    const assigned = new Set<string>();
    items.forEach(item => {
      if (!window.oTheme.map.has(item.value))
      {
        this.menuElement.removeChild(item);
      }
      else 
      {
        assigned.add(item.value);
      }
    });
  
    Array.from(window.oTheme.map).forEach(([name, config]) => {
      if (!assigned.has(name))
      {
        const newitem = this.templateElement.content.cloneNode(true) as HTMLElement;
        
        const itemElement = newitem.querySelector<MenuItem>('o-menu-item');
        if (itemElement) 
        {
          itemElement.setAttribute('value', name);
        }

        const spanElement = newitem.querySelector("span");
        if (spanElement) spanElement.style.backgroundColor = config.representColor;

        const typographyElement = newitem.querySelector("o-typography");
        if (typographyElement) typographyElement.innerHTML = config.name

        this.menuElement.appendChild(newitem);
      }
    })
  }
  private handlethemechange = () => {
    if (this.menuElement)
    {
      const config = window.oTheme.map.get(window.oTheme.current);
      if (config)
      {
        this.themecolorElement.style.backgroundColor = config.representColor;
        this.menuElement.value = window.oTheme.current;
      }
    }
  }
  private handleselect = (e:Event) => {
    const menu = e.target as Menu;
    if (menu)
    {
      if (window.oTheme.current !== menu.value)
      {
        window.oTheme.change(menu.value);
      }
    }
  }
  private handlechange = (e:Event) => {
    const toggle = e.target as Toggle;
    if (toggle) 
    {
      this.setlightdark(toggle.checked ? "dark" : "light");
    }
  }

  render() {
    return html`
      <template>
        <o-menu-item>
          <span class="theme-color"></span>
          <o-typography></o-typography>
        </o-menu-item>
      </template>

      <o-toggle value="${window.sessionStorage.getItem("o-lightdarktheme") === "dark" ? "true" : "false"}" @change="${this.handlechange}">
        <o-icon name="light-mode"></o-icon>
        <o-icon name="dark-mode"></o-icon>
      </o-toggle>

      <o-menu placement="bottom-right" @select="${this.handleselect}">
        <span slot="button-prefix" class="theme-color"></span>
        <o-typography slot="button-content" class="theme-name"><o-translator>Theme</o-translator></o-typography>
      </o-menu>
    `
  }
}