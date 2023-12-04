// system 
import { context, html, ifDefined, property, query } from "@pap-it/system-utils";
import { BaseSystem } from "@pap-it/system-base";

// atoms
import { Checkbox } from "@pap-it/checkbox";
import { Input } from "@pap-it/input";
import "@pap-it/button/wc";
import "@pap-it/icon/wc";
import "@pap-it/checkbox/wc";
import "@pap-it/typography/wc";
import "@pap-it/input/wc";

// molecules
import "@pap-it/drag-list/wc";

// tools 
import { Translator } from "@pap-it/tools-translator";

// local
import { style } from "./style";
import { Column, DefaultConfig, StrictConfig } from "../../types";

export class TableManage extends Translator {
  static style = style;

  @context() columns: Column[] = [];
  @context() config: StrictConfig = DefaultConfig;

  // event handlers
  private handlecheckboxchange = (type: "visible" | "locked", column: Column) => {
    return (e: Event) => {
      if (e.target instanceof HTMLElement) {
        const value = (e.target as Checkbox).checked;
        console.log('checked', type, value, column);
      }
    }
  }
  private handleinput = (type: "title" | "subtitle", column: Column) => {
    return (e: Event) => {
      if (e.target instanceof HTMLElement) {
        const value = (e.target as Input).value
        console.log('value', type, column, value);
      }
    }
  }
  private handleadd = () => {
    this.dispatchEvent(new Event('add'));
  }

  render() {
    return html`
      <header>
        <pap-icon name="eye" cache="true"></pap-icon>
        ${!this.config.actions.manage?.setting.readonly ? html`
          <pap-icon name="lock" cache="true"></pap-icon>
          <pap-typography variant="C4">${this.translateKey('Subtitle')}</pap-typography>
          ` : ''}
        <pap-typography variant="C4">${this.translateKey('Title')}</pap-typography>
      </header>
      <pap-drag-list>
        ${this.columns.map(column => html`
          <pap-drag-list-item key="${column.id}">
            <pap-checkbox 
              @change="${this.handlecheckboxchange("visible", column)}"
              size="small" 
              checked="${ifDefined(column.visible)}" 
            >
            </pap-checkbox>
            ${!this.config.actions.manage?.setting.readonly ? html`
              <pap-checkbox 
                @change="${this.handlecheckboxchange("locked", column)}"
                size="small" 
                checked="${ifDefined(column.locked)}" 
              >
              </pap-checkbox>

              <pap-input 
                @debounced-input="${this.handleinput("subtitle", column)}" 
                size="small" 
                radius="medium" 
                value="${ifDefined(column.subtitle)}"
              >
              </pap-input>

              <pap-input 
                @debounced-input="${this.handleinput("title", column)}" 
                size="small" 
                radius="medium" 
                value="${ifDefined(column.title)}"
              >
              </pap-input>
            ` : `<pap-typography variant="C4">${column.title}</pap-typography>`}
          </pap-drag-list-item>
        `)}
      </pap-drag-list>
      ${this.config.edit ? html`
        <pap-button @click="${this.handleadd}" variant="clear" color="secondary" size="small">
          <pap-icon name="plus-circle" cache="true"></pap-icon>
          ${this.translateKey("Add column")}
        </pap-button>
      ` : ''}
    `
  }
}