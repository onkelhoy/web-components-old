// system 
import { html, property, query } from "@pap-it/system-utils";
import { BaseSystem } from "@pap-it/system-base";

// atoms 
import { Toggle } from '@pap-it/toggle';
import "@pap-it/icon/wc";
import "@pap-it/toggle/wc";


// local
import { style } from "./style";
import { LightDarkTheme } from '../../types';

export class Lightdark extends BaseSystem {
  static style = style;

  @property() mode!: LightDarkTheme;

  // class functions
  connectedCallback() {
    super.connectedCallback();

    this.mode = window.sessionStorage.getItem("pap-lightdarktheme") as LightDarkTheme || "light";

    if (!window.sessionStorage.getItem("pap-lightdarktheme")) {
      this.setlightdark(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    }

    // register event 
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", this.handleprefercolorchange);
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
    this.mode = e.matches ? "dark" : "light"
  }
  private handlechange = (e: Event) => {
    const toggle = e.target as Toggle;
    if (toggle) {
      this.setlightdark(toggle.checked ? "dark" : "light");
    }
  }

  render() {
    return html`
      <pap-toggle 
        @change="${this.handlechange}"
        value="${this.mode === "dark" ? "true" : "false"}" 
      >
        <pap-icon name="light-mode"></pap-icon>
        <pap-icon name="dark-mode"></pap-icon>
      </pap-toggle>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pap-lightdark": Lightdark;
  }
}