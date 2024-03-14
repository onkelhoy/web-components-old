// system 
import { html, ifDefined, property, query } from "@pap-it/system-utils";
import { Base } from "@pap-it/system-base";

// atoms
import { Icon } from "@pap-it/icon";
import "@pap-it/menu/wc";
import { Menu } from "@pap-it/menu";

// templates
import { Placement } from "@pap-it/templates-popover";

// tools
import { TRANSLATION_ADDED, TRANSLATION_CHANGE_EVENTNAME, init } from "@pap-it/tools-translator";
import "@pap-it/tools-translator/wc";

// local imports
import { style } from "./style";
import { Language } from './types'

export class LanguageMenu extends Base {
  static style = style;

  @query('pap-menu') menuElement!: Menu;
  @query({
    selector: 'pap-icon[part="language-icon"]',
    load: function (this: LanguageMenu) {
      this.setLanguageIcon();
    }
  }) languageIcon!: Icon;

  // NOTE these should be reqions !
  @property({ type: Array, attribute: false }) languages: Language[] = [];
  @property() placement: Placement = "bottom-right";
  @property({ type: Boolean, rerender: false }) border?: boolean = false;

  public intl?: Intl.DisplayNames;

  constructor() {
    super();
    init();
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

      this.setLanguageIcon();

      // country - flag="${ifDefined(region)}"
      this.handlenewlanguage();
    }
  }
  private setLanguageIcon() {
    if (!this.languageIcon) return;

    if (window.papLocalization.current.meta) {

      const region = window.papLocalization.current.meta.region;
      this.languageIcon.countryFlag = region;
    }
    else {
      this.languageIcon.countryFlag = undefined;
    }
  }
  private handlelanguageselect = (e: Event) => {
    const menu = e.target as Menu;
    if (menu && menu.value && menu.value !== "init") window.papLocalization.change(menu.value);
  }

  render() {
    let currentlang = undefined;
    if (window.papLocalization && window.papLocalization.current.meta) {
      currentlang = window.papLocalization.current.meta.language.split('-')[0];
    }

    // would be nice to control placement.. 
    return html`
      <pap-menu buttonRadius="circular" placement="${this.placement}" @select="${this.handlelanguageselect}">
        
        <pap-icon part="language-icon" container="smaller" slot="button-prefix" name="globe">g</pap-icon>

        ${currentlang ? `<pap-typography key="current-language-text" variant="C4" slot="button-content">${currentlang.toUpperCase()}</pap-typography>` : ''}

        ${this.languages.map(v => html`
          <pap-menu-item key="${v.id}" value="${v.id}">
            <pap-icon slot="prefix" style="font-size: 12pt" country-flag="${v.region}"></pap-icon>
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