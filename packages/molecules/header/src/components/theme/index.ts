// utils 
import { html, property, query } from "@circular-tools/utils";
import { change as ChangeTheme, THEMECHANGE_NAME, THEMEADD_NAME } from "@circular-tools/theme";
import "@circular-tools/translator/wc";

// atoms 
import { Menu, MenuItem } from '@circular/menu';
import { Toggle } from '@circular/toggle';
import "@circular/menu/wc";
import "@circular/typography/wc";
import "@circular/toggle/wc";
import "@circular/icon/wc";

// templates
import { BaseTemplate } from "@circular-templates/base";

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
  private setlightdark(mode: LightDarkTheme) {
    window.sessionStorage.setItem("o-lightdarktheme", mode);
    document.documentElement.classList.remove('theme-light', 'theme-dark');
    document.documentElement.classList.add(`theme-${mode}`);
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
    if (e.target instanceof Menu)
    {
      if (window.oTheme.current !== e.target.value)
      {
        window.oTheme.change(e.target.value);
      }
    }
  }
  private handlechange = (e:Event) => {
    if (e.target instanceof Toggle) 
    {
      this.setlightdark(e.target.checked ? "dark" : "light");
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