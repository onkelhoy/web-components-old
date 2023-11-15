// utils 
import { html, query } from "@papit/tools-utils";
import { TRANSLATION_ADDED, TRANSLATION_CHANGE_EVENTNAME, InitTranslations } from "@papit/tools-translator";
import "@papit/tools-translator/wc";

// atoms
import "@papit/menu/wc";
import { Menu, MenuItem } from "@papit/menu";

// templates
import { BaseTemplate } from "@papit/templates-base";

// local imports
import { style } from "./style";
import LanguageEmojis from './languages.json';

export class Language extends BaseTemplate {
  static style = style;

  @query('span.display') displayElement!: HTMLSpanElement;
  @query('pap-menu') menuElement!: Menu;
  @query('template') templateElement!: HTMLTemplateElement;

  constructor() {
    super();
    InitTranslations();
  }

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener(TRANSLATION_ADDED, this.handlenewlanguage);
    window.addEventListener(TRANSLATION_CHANGE_EVENTNAME, this.handlelanguagechange);

    if (window.oTranslation?.map?.size > 0)
    {
      this.handlenewlanguage();
    }
  }
  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener(TRANSLATION_ADDED, this.handlenewlanguage);
  }

  // event handlers 
  private handlenewlanguage = () => {
    if (window.oTranslation)
    {
      const currentLanguages = this.menuElement.querySelectorAll<MenuItem>("pap-menu-item");
      const languages = Array.from(window.oTranslation.map);
      const exists = new Set();
  
      currentLanguages.forEach(item => {
        const v = item.value;
        if (!window.oTranslation.map.has(v))
        {
          this.menuElement.removeChild(item);
        }
        else 
        {
          exists.add(v);
        }
      })
  
      languages.forEach(([id, set]) => {
        if (!exists.has(id))
        {
          const newitem = this.templateElement.content.cloneNode(true) as HTMLElement;
        
          const itemElement = newitem.querySelector<MenuItem>('pap-menu-item');
          if (itemElement) 
          {
            itemElement.setAttribute('value', set.id);
          }
  
          const translatorElement = newitem.querySelector("pap-translator");
          if (translatorElement) translatorElement.innerHTML = set.name
  
          const spanElement = newitem.querySelector("span.flag > span");
          if (spanElement) spanElement.innerHTML = (LanguageEmojis as any)[set.name]
  
          this.menuElement.appendChild(newitem);
        }
      })
    }
  }
  private handlelanguagechange = () => {
    if (this.menuElement && window.oTranslation?.current)
    {
      if (this.displayElement) 
      {
        this.displayElement.parentElement?.classList.remove('globe')
        this.displayElement.innerHTML = (LanguageEmojis as any)[window.oTranslation.current.name]
      }
      if (this.menuElement.value !== window.oTranslation.current.id)
      {
        this.menuElement.value = window.oTranslation.current.id;
      }
    }
  }
  private handlelanguageselect = (e:Event) => {
    const menu = e.target as Menu;
    if (menu && this.displayElement)
    {
      if (menu.value !== "init") window.oTranslation.change(menu.value);
    }
  }

  render() {
    return html`
      <template>
        <pap-menu-item>
          <div class="grid">
            <span class="wrapper">
              <span class="flag">
                <span></span>
              </span>
            </span>
            <pap-typography><pap-translator></pap-translator></pap-typography>
          </div>
        </pap-menu-item>
      </template>

      <pap-menu placement="bottom-left" @select="${this.handlelanguageselect}">
        <span slot="button-prefix" class="wrapper">
          <span class="flag globe">
            <span class="display">
              <pap-icon name="globe">g</pap-icon>
            </span>
          </span>
        </span>
        <pap-menu-item value="init"><pap-translator>No Languages Available</pap-translator></pap-menu-item>
      </pap-menu>
    `
  }
}