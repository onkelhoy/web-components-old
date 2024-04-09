// system 
import { html, property, query } from "@pap-it/system-utils";

// atoms
import "@pap-it/menu/wc";

// tools
import { Translator } from "@pap-it/tools-translator";

// local
import { style } from "./style";
import { ISheet } from '../../types';

export class Sheets extends Translator {
  static style = style;

  @property({ type: Array, attribute: false }) list: ISheet[] = [];
  @property() selected?: string;

  // event handlers
  private handleadd = () => {
    console.log('add')

    this.list.push({
      hidden: false,
      locked: false,
      id: `${this.list.length}-${Math.floor(Math.random() * 1000)}-${Math.floor(performance.now() * 1000)}`,
      name: `Sheet ${this.list.length + 1}`
    })

    this.requestUpdate();
    console.log(this.list);
    // name: this.translateKey('Sheet {index}', { index: this.list.length + 1 });
  }
  private handleselectsheet = () => {
    console.log('sheet select')
  }
  private handleselectsheetitem = (e: Event) => {
    console.log('hello?')
    if (e.currentTarget instanceof HTMLElement) {
      const id = e.currentTarget.getAttribute('key');
      const item = this.list.find(item => item.id === id);
      if (item) {
        const value = e.currentTarget.getAttribute('value');
        console.log('something with this item', item, value);
      }
    }
  }
  private handleselect = () => {

  }

  render() {
    return html`
      <pap-menu placement="bottom-right" @select="${this.handleselectsheet}">
        <pap-button 
          circle="true"
          radius="medium"
          slot="button"
          variant="clear"
          color="secondary"
        >
          <pap-icon name="hamburger" cache="true"></pap-icon>
        </pap-button>
        ${this.list.map(item => html`<pap-menu-item value="${item.id}" key="${item.id}">${item.name}</pap-menu-item>`)}
      </pap-menu>

      <pap-button 
        @click="${this.handleadd}" 
        circle="true" 
        radius="medium" 
        slot="button" 
        variant="clear" 
        color="secondary"
      >
        <pap-icon name="plus" cache="true"></pap-icon>
      </pap-button>

      <div>
        ${this.list.map(item => html`
          <pap-menu
            @select="${this.handleselectsheetitem}"
            key="${item.id}" 
            class="item"
          >
            <pap-button 
              @click="${this.handleselect}"
              id="${item.id}"
              slot="button"
              variant="clear"
              color="secondary"
            >
              ${item.name}
              <pap-icon custom-size="10" name="chevron" slot="suffix"></pap-icon>
            </pap-button>
            <pap-menu-item value="delete">
              <pap-icon slot="prefix" name="trash" cache="true"></pap-icon>
              ${this.translateKey('Delete')}
            </pap-menu-item>
            <pap-menu-item value="duplicate">
              <pap-icon slot="prefix" name="duplicate" cache="true"></pap-icon>
              ${this.translateKey('Duplicate')}
            </pap-menu-item>
            <pap-menu-item value="rename">
              <pap-icon slot="prefix" name="edit" cache="true"></pap-icon>
              ${this.translateKey('Rename')}
            </pap-menu-item>
            <pap-menu-item value="hide">
              ${item.hidden ?
        html`<pap-icon slot="prefix" name="eye" cache="true"></pap-icon> ${this.translateKey('Show')}` :
        html`<pap-icon slot="prefix" name="eye-closed" cache="true"></pap-icon> ${this.translateKey('Hide')}`
      }
            </pap-menu-item>
            <pap-menu-item value="lock">
            ${item.locked ?
        html`<pap-icon slot="prefix" name="unlock" cache="true"></pap-icon> ${this.translateKey('Unlock')}` :
        html`<pap-icon slot="prefix" name="lock" cache="true"></pap-icon> ${this.translateKey('Lock')}`
      }
            </pap-menu-item>
          </pap-menu>
        `)}
      </div>
    `
  }
}


declare global {
  interface HTMLElementTagNameMap {
    "pap-table-sheets": Sheets;
  }
}