// system 
import { html, property, context, query } from "@pap-it/system-utils";

// atoms 
import "@pap-it/icon/wc";
import "@pap-it/typography/wc";
import "@pap-it/divider/wc";
import "@pap-it/button/wc";
import "@pap-it/menu/wc";

// molecules
import "@pap-it/search/wc";

// tools
import { Translator } from "@pap-it/tools-translator";

// local
import { style } from "./style";
import { Config, DefaultConfig, HeaderSearch, CustomAction, HeaderActionClick } from "../../types";
import { Menu } from "@pap-it/menu";

export class TableHeader extends Translator {
  static style = style;

  @context() config: Config = DefaultConfig;
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
      this.dispatchActionClick((e.target as Menu).value);
    }
  }

  // helper functions 
  private dispatchActionClick(type: string) {
    if (this.config.actions[type] instanceof Object) {
      const callback = (this.config.actions[type] as CustomAction).callback;
      if (callback instanceof Function) {
        callback();
      }
    }
    this.dispatchEvent(new CustomEvent<HeaderActionClick>('action', { detail: { type } }))
  }
  private renderActions() {
    const actions = [];
    const menu = [];

    for (let key in this.config.actions) {
      let name = key;
      let icon = key;

      if (this.config.actions[key] instanceof Object) {
        name = (this.config.actions[key] as CustomAction).name || key;
        icon = (this.config.actions[key] as CustomAction).icon || name;
      }
      else if (typeof this.config.actions[key] === "string") {
        name = this.config.actions[key] as string;
        icon = name;
      }

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
          <pap-typography truncate="true" variant="T4">${this.translateKey(this.tableTitle)}</pap-typography>
          ${this.config?.search ? html`<pap-search @change="${this.handlesearch}" data-name="search"></pap-search>` : ''}
        </div>
        <pap-divider></pap-divider>
        <div class="bottom">
          <div class="actions">
            ${this.renderActions()}
          </div>
          
          ${this.config?.edit ? html`
            <pap-divider mode="vertical"></pap-divider>
            <pap-button data-name="save" @click="${this.handlesave}">${this.translateKey('Save')}</pap-button>
          ` : ''}
        </div>
      </header>
    `
  }
}