// system 
import { ExtractSlotValue, html, property, query } from "@pap-it/system-utils";
import { BaseSystem } from "@pap-it/system-base";

// atoms
import "@pap-it/tabs/wc";
import "@pap-it/icon/wc";
import "@pap-it/typography/wc";

// tools 
import "@pap-it/tools-translator/wc";

// local
import { style } from "./style";
import { TableMenu } from "../table-menu";

export class TableActionMenu extends BaseSystem {
  static style = style;

  private handletabchange = (e: Event) => {
    if (e instanceof CustomEvent) {

      // this.headerTitle = e.detail.id;
    }
  }

  render() {
    return html`
      <pap-tabs @tab-select="${this.handletabchange}">
        <pap-tab id="filters">
          <div>
            <pap-icon name="filter"></pap-icon>
            <pap-typography variant="C4"><pap-translate>Filters</pap-translate></pap-typography>
          </div>
        </pap-tab>
        <pap-tab id="manage">
          <div>
            <pap-icon name="manage"></pap-icon>
            <pap-typography variant="C4"><pap-translate>Manage table</pap-translate></pap-typography>
          </div>
        </pap-tab>
        <pap-tab id="export">
          <div>
            <pap-icon name="export"></pap-icon>
            <pap-typography variant="C4"><pap-translate>Export</pap-translate></pap-typography>
          </div>
        </pap-tab>
        <pap-tab id="settings">
          <div>
            <pap-icon name="setting"></pap-icon>
            <pap-typography variant="C4"><pap-translate>Settings</pap-translate></pap-typography>
          </div>
        </pap-tab>

        <pap-tab-content id="filters">
          <slot name="filters">
            lalalal im the filter now
          </slot>
        </pap-tab-content>

        <pap-tab-content id="manage">
          I manage the table now
        </pap-tab-content>

        <pap-tab-content id="export">
          <pap-typography variant="C2"><pap-translate>File format</pap-translate></pap-typography>
          
          <footer>
            
          </footer>
        </pap-tab-content>

        <pap-tab-content id="settings">
          SETTINGS
        </pap-tab-content>
      </pap-tabs>
    `
  }
}