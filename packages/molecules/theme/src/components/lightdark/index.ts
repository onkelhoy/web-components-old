// system 
import { html, property, CustomElement } from "@pap-it/system-utils";

// atoms 
import { Switch } from '@pap-it/switch';
import "@pap-it/icon";
import "@pap-it/switch";


// local
import { style } from "./style";
import { LightDarkTheme } from '../../types';

export class Lightdark extends CustomElement {
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
    const Switch = e.target as Switch;
    if (Switch) {
      this.setlightdark(Switch.checked ? "dark" : "light");
    }
  }

  render() {
    return html`
      <pap-switch 
        @change="${this.handlechange}"
        checked="${this.mode === "dark"}" 
      >
        <pap-icon name="light-mode"></pap-icon>
        <pap-icon name="dark-mode"></pap-icon>
      </pap-switch>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pap-lightdark": Lightdark;
  }
}