// system 
import { html, property, query } from "@pap-it/system-utils";
import { Base } from "@pap-it/system-base";


// atoms
import "@pap-it/menu/wc";
import { Menu } from "@pap-it/menu";

// templates
import { Placement } from "@pap-it/templates-popover";

// tools
import { TRANSLATION_ADDED, TRANSLATION_CHANGE_EVENTNAME, InitTranslations } from "@pap-it/tools-translator";
import "@pap-it/tools-translator/wc";

// local imports
import { style } from "./style";
import { Language } from './types'

export class LanguageMenu extends Base {
  static style = style;

  @query('pap-menu') menuElement!: Menu;

  // NOTE these should be reqions !
  @property({ type: Array, attribute: false }) languages: Language[] = [];
  @property() placement: Placement = "bottom-right";

  public intl?: Intl.DisplayNames;

  constructor() {
    super();
    InitTranslations();
  }

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener(TRANSLATION_ADDED, this.handlenewlanguage);
    window.addEventListener(TRANSLATION_CHANGE_EVENTNAME, this.handlelanguagechange);

    if (window.papLocalization?.map?.size > 0) {
      this.handlenewlanguage();
    }
  }
  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener(TRANSLATION_ADDED, this.handlenewlanguage);
  }

  // event handlers 
  private handlenewlanguage = () => {
    if (window.papLocalization) {
      const languages = Array.from(window.papLocalization.map);
      this.languages = languages.map(([_key, set]) => {
        let text = set.meta.language;
        if (this.intl) {
          const check = this.intl.of(text);
          if (check) text = check;
        }

        return {
          id: set.id,
          text,
          ...set.meta,
        }
      });
    }
  }
  private handlelanguagechange = () => {
    if (this.menuElement && window.papLocalization?.current) {
      if (this.menuElement.value !== window.papLocalization.current.id) {
        this.menuElement.value = window.papLocalization.current.id;
      }
      if ('DisplayNames' in Intl && window.papLocalization.current.meta) {
        this.intl = new Intl.DisplayNames([window.papLocalization.current.meta.language], { type: 'language' });
      }

      this.handlenewlanguage();
    }
  }
  private handlelanguageselect = (e: Event) => {
    const menu = e.target as Menu;
    if (menu && menu.value && menu.value !== "init") window.papLocalization.change(menu.value);
  }

  render() {
    // would be nice to control placement.. 
    return html`
      <pap-menu buttonRadius="circular" placement="${this.placement}" @select="${this.handlelanguageselect}">
        
        <span slot="button-prefix" class="wrapper">
          <span class="flag globe">
            <span class="display">
              <pap-icon name="globe">g</pap-icon>
            </span>
          </span>
        </span>

        ${this.languages.map(v => html`
          <pap-menu-item key="${v.id}" value="${v.id}">
            <pap-icon style="font-size: 12pt" country-flag="${v.region}"></pap-icon>
            ${v.text}
          </pap-menu-item>
        `)}
        ${this.languages.length === 0 ? html`<pap-menu-item key="init" value="init"><pap-translator>No languages available</pap-translator></pap-menu-item>` : ''}
      </pap-menu>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pap-language-menu": LanguageMenu;
  }
}