// system 
import { html, property, context, query } from "@pap-it/system-utils";

// atoms 
import "@pap-it/icon";
import "@pap-it/typography";
import "@pap-it/divider";
import "@pap-it/button";
import "@pap-it/menu";

// molecules
import "@pap-it/search";

// tools
import { Translator } from "@pap-it/tools-translator";

// local
import { style } from "./style";
import { DefaultConfig, HeaderSearch, HeaderActionClick, StrictConfig } from "../../types";

export class Header extends Translator {
  static style = style;

  @property({ type: Boolean }) customsavebutton: boolean = false;

  @context() config: StrictConfig = DefaultConfig();
  @context({ attribute: "table-title" }) tableTitle: string = "";

  // event handlers 
  private handlesave = () => {
    this.dispatchEvent(new Event('save'));
  }
  private handlesearch = (e: Event) => {
    if (e.target && 'value' in e.target) {
      this.dispatchEvent(new CustomEvent<HeaderSearch>('search', { detail: { value: e.target.value as string } }));
    }
  }
  private handleactionclick = (type: string) => {
    return () => {
      this.dispatchActionClick(type);
    }
  }
  private handlemoreselect = (e: Event) => {
    if (e.target instanceof HTMLElement) {
      // this.dispatchActionClick((e.target as Menu).value);
    }
  }
  private handlesaveslotchange = (e: Event) => {
    if (e.target instanceof HTMLSlotElement) {
      const elements = e.target.assignedElements({ flatten: true });
      if (elements.length > 0) {
        this.customsavebutton = true;
      }
    }
  }

  // helper functions 
  private dispatchActionClick(type: string) {
    if (this.config.actions[type].callback) {
      const callback = this.config.actions[type].callback;
      // keeping TS happy..
      if (callback instanceof Function) callback();
    }
    this.dispatchEvent(new CustomEvent<HeaderActionClick>('action', { detail: { type } }))
  }
  private renderActions() {
    const actions = [];
    const menu = [];

    for (let key in this.config.actions) {
      const { name, icon } = this.config.actions[key];

      menu.push(html`
        <pap-menu-item value="${key}" key="${name}">
          <pap-icon slot="prefix" cache="true" name="${icon}"></pap-icon>
          <pap-typography>${this.translateKey(name)}</pap-typography>
        </pap-menu-item>
      `);

      actions.push(html`
        <pap-button 
          @click="${this.handleactionclick(key)}"
          circle="true" 
          color="secondary" 
          variant="clear"
          data-name="${name}" 
        >
          <pap-icon cache="true" name="${icon}"></pap-icon>
        </pap-button>
      `);
    }

    if (menu.length > 0) {
      actions.push(html`
        <pap-menu close-on-select="true" @select="${this.handlemoreselect}">
          <pap-button 
            circle="true" 
            color="secondary" 
            variant="clear" 
            slot="button"
          >
            <pap-icon cache="true" name="more"></pap-icon>
          </pap-button>

          ${menu}
        </pap-menu>
      `);
    }

    return actions;
  }

  render() {
    return html`
      <header>
        <div class="top">
          <slot name="title"><pap-typography truncate="true" variant="T4">${this.translateKey(this.tableTitle)}</pap-typography></slot>
          ${this.config?.search ? html`<pap-search mode="${this.config.search === "fixed" ? "fixed" : "dynamic"}" @change="${this.handlesearch}" data-name="search"></pap-search>` : ''}
        </div>
        <pap-divider></pap-divider>
        <div class="bottom">
          <div class="actions">${this.renderActions()}</div>
          
          ${this.config?.edit ? html`
            <pap-divider mode="vertical"></pap-divider>
            <slot @slotchange="${this.handlesaveslotchange}" name="save"></slot>
            ${!this.customsavebutton ? html`<pap-button data-name="save" @click="${this.handlesave}">${this.translateKey('Save')}</pap-button>` : ''}
          ` : ''}
        </div>
      </header>
    `
  }
}


declare global {
  interface HTMLElementTagNameMap {
    "pap-table-header": Header;
  }
}