// utils 
import { html, property, query, DetectDevice, Devices, suspense } from "@pap-it/system-utils";
import "@pap-it/tools-translator/wc";

// atoms 
import "@pap-it/button/wc";
import "@pap-it/icon/wc";
import "@pap-it/divider/wc";
import "@pap-it/typography/wc";

// templates
import { BoxTemplate } from "@pap-it/templates-box";
import { BaseSystem } from "@pap-it/system-base";
import '@pap-it/templates-box/wc'

// local 
import { style } from "./style";
import { Mode, SelectEvent } from "./types";
import { Item } from "./components/item";

export class Sidebar extends BaseSystem {
  static style = style;

  @property({ rerender: false }) mode: Mode = "open";
  @property({ onUpdate: "updateSelected" }) selected?: string;
  @property() unit: Devices = "desktop";

  @query('pap-box-template') boxtemplateElement!: BoxTemplate;

  private items: Array<Item> = [];
  private currentSelected?: Item;
  private currentAncestorSelected?: Item;

  constructor() {
    super();

    this.handlewindowresize_debounced = suspense(this.handlewindowresize_debounced, 20);
  }

  // class functions 
  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener("resize", this.handlewindowresize);
    window.addEventListener("theme-appearance-change", this.handleThemeAppearanceChange);
  }
  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener("resize", this.handlewindowresize);
    window.removeEventListener("theme-appearance-change", this.handleThemeAppearanceChange);
  }
  firstUpdate(): void {
    super.firstUpdate();
    this.handlewindowresize_debounced();
  }

  // update handlers
  private updateSelected = () => {
    const element = this.items.find(e => e.id === this.selected || e.text === this.selected);
    if (element) {
      element.handleclick();
    }
    else {
      return 10;
    }
  }

  // event handlers
  private handlewindowresize_debounced = () => {
    this.unit = DetectDevice(this);
  }
  private handlewindowresize = () => {
    this.handlewindowresize_debounced();
  }
  private handleThemeAppearanceChange = (e: Event) => {
    if (e instanceof CustomEvent) {
      this.classList.remove('theme-light', 'theme-dark');
      this.classList.add(`theme-${e.detail.value}`);
    }
  }
  private handlehamburgerclick = () => {

    if (this.boxtemplateElement) this.boxtemplateElement.elevation = "none"
    if (this.mode === "open") {
      if (["mobile", "pad"].includes(this.unit)) {
        this.mode = "collapsed"
      }
      else {
        this.mode = "hover";
        if (this.boxtemplateElement) this.boxtemplateElement.elevation = "medium"
      }
    }
    else if (this.mode === "hover") {
      this.mode = "open";
    }
    else {
      this.mode = "open";
    }

    this.dispatchEvent(new Event("change"));
  }
  private handleslotchange = (e: Event) => {
    if (e.target instanceof HTMLSlotElement) {
      const elements = e.target.assignedElements();
      elements.forEach(element => {
        if (element instanceof Item) {
          if (!element.hasAttribute("navbar-init")) {
            element.addEventListener('select', this.handleitemselect);
            element.addEventListener('child-select', this.handleancestorselect);
            element.setAttribute('navbar-init', 'true');
            this.items.push(element);
          }
        }
      })

    }
  }
  private handleitemselect = (e: Event) => {
    if (e.target instanceof Item) {
      this.currentAncestorSelected?.deselect();
      if (e.target !== this.currentSelected) {
        this.currentSelected?.deselect();
      }
      this.currentSelected = e.target;

      this.dispatchEvent(new CustomEvent<SelectEvent>("select", { detail: { id: e.target.id || e.target.text } }));
    }
  }
  private handleancestorselect = (e: Event) => {
    if (e instanceof CustomEvent && e.target instanceof Item) {
      const childtarget = e.detail as Item;
      if (e.target !== this.currentAncestorSelected) {
        this.currentAncestorSelected?.deselect();
      }
      if (childtarget !== this.currentSelected) {
        this.currentSelected?.deselect();
        this.currentSelected = childtarget;

        this.dispatchEvent(new CustomEvent<SelectEvent>("select", { detail: { id: childtarget.id || childtarget.text } }));
      }
      this.currentAncestorSelected = e.target;
    }
  }

  render() {
    return html`
            <pap-button part="hamburger-outside" color="inverse" circle="true" @click="${this.handlehamburgerclick}">
                <pap-icon size="small" name="hamburger"></pap-icon>
            </pap-button>
            <pap-box-template part="base" radius="medium">
                <header part="header">
                    <pap-icon class="logo" style="width:124px" size="large" name="interzero-logo"></pap-icon>
                    <!-- <pap-icon class="logo dark" style="width:124px" size="large" name="interzero-logo-dark"></pap-icon> -->
                    <pap-button part="hamburger-inside" color="secondary" circle="true" variant="clear" @click="${this.handlehamburgerclick}">
                        <pap-icon size="small" name="hamburger"></pap-icon>
                    </pap-button>
                </header>
                <pap-divider></pap-divider>
                <div part="body">
                    <slot @slotchange="${this.handleslotchange}"></slot>
                </div>
                <footer part="footer">
                    <slot name="footer"></slot>
                </footer>
            </pap-box-template>
        `
  }
}


declare global {
  interface HTMLElementTagNameMap {
    "pap-sidebar": Sidebar;
  }
}