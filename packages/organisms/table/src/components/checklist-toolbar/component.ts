// system 
import { html, property, query, CustomElement, context } from "@pap-it/system-utils";

// atoms 
import { Button } from "@pap-it/button";
import "@pap-it/typography/wc";
import "@pap-it/divider/wc";
import "@pap-it/icon/wc";
import "@pap-it/button/wc";
import "@pap-it/tooltip/wc"

// templates 
import "@pap-it/templates-box/wc";

// tools 
import "@pap-it/tools-translator/wc";

// local
import { style } from "./style";
import { DefaultConfig, StrictConfig } from "../../types";

export class ChecklistToolbar extends CustomElement {
  static style = style;

  @property({ type: Number }) count: number = 0;
  @context() config: StrictConfig = DefaultConfig();

  // event handlers 
  private handleclick = (e: Event) => {
    if (e.currentTarget instanceof Button && this.config.checklist) {

      const name = e.currentTarget.getAttribute('data-name');

      if (name && this.config.checklist.toolbar instanceof Object) {
        const setting = this.config.checklist.toolbar[name];
        if (setting.callback) setting.callback();
      }

      this.dispatchEvent(new CustomEvent('action', { detail: { value: name } }));
    }
  }

  // helper functions 
  private renderactions() {
    const actions = [];

    if (this.config.checklist?.toolbar instanceof Object) {
      for (const name in this.config.checklist.toolbar) {
        actions.push(html`
          <pap-divider key="${name}-divider" mode="vertical"></pap-divider>
          <pap-tooltip placement="bottom-center" key="${name}">
            <pap-button slot="target" data-name="${name}" circle="true" color="inverse" variant="clear" @click="${this.handleclick}">
              <pap-icon name="${this.config.checklist.toolbar[name].icon}"></pap-icon>
            </pap-button>

            <pap-typography><pap-translator>${name}</pap-translator></pap-typography>
          </pap-tooltip>
        `)
      }
    }

    return actions;
  }

  render() {

    return html`
      <pap-box-template elevation="small" radius="medium">
        <pap-typography><pap-translator count="${this.count}">{count} selected</pap-translator></pap-typography>

        ${this.renderactions()}
      </pap-box-template>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pap-table-checklist-toolbar": ChecklistToolbar;
  }
}