// system
import { html, query, property, ifDefined } from "@pap-it/system-utils";

// atoms 
import "@pap-it/typography/wc";
import "@pap-it/button/wc";
import "@pap-it/icon/wc";
import "@pap-it/input/wc";

// molecules
import { Pagination } from "@pap-it/pagination";
import "@pap-it/pagination/wc";

// tools
import { Translator } from "@pap-it/tools-translator";
import "@pap-it/tools-translator/wc";

// templates
import "@pap-it/templates-box/wc";

// local 
import { style } from "./style";
import { DefaultConfig, Config, Column, CustomAction } from "./types";
import { TableHeader } from "./components/table-header";
import { TableMenu } from "./components/table-menu";

export class Table extends Translator {
  static style = style;

  // queries
  @query('pap-pagination') paginationElement!: Pagination;
  @query('pap-table-menu') tablemenuElement!: TableMenu;
  @query<TableHeader>({
    selector: 'pap-table-header', load: function (this: Table) {
      if (this.config) {
        this.tableheaderElement.config = this.config;
      }

    }
  }) tableheaderElement!: TableHeader;

  // propterties
  @property({ attribute: 'table-title', context: true }) tableTitle?: string;
  @property({ type: Object, attribute: false, onUpdate: 'onconfigupdate', context: true }) config: Config = DefaultConfig;
  @property({ type: Array, attribute: false, context: true }) columns: Column[] = [];

  // updators
  private onconfigupdate = () => {
    if (this.tableheaderElement) {
      this.tableheaderElement.config = this.config;
    }
  }

  // event handlers
  private handlesave = (e: Event) => {
    console.log('save');
  }
  private handleactionclick = (e: CustomEvent) => {
    if (this.tablemenuElement) {
      const action = this.config.actions[e.detail.type];
      if (action instanceof Object) {
        this.tablemenuElement.headerTitle = (this.config.actions[e.detail.type] as CustomAction).name || e.detail.type;
      }
      else if (typeof action === "string") {
        this.tablemenuElement.headerTitle = this.config.actions[e.detail.type] as string;
      }
      else {
        this.tablemenuElement.headerTitle = e.detail.type
      }
      this.tablemenuElement.show();
    }
  }
  private handlesearch = (e: CustomEvent) => {
    console.log('search', e.detail.value)
  }
  private handlefilterapply = (e: Event) => {
    console.log('filter', e);
  }

  // helper functions
  private actionMenus() {
    const actions = [];
    if (this.config.actions) {
      for (const key in this.config.actions) {
        let icon = key;
        if (this.config.actions[key] instanceof Object) {
          icon = (this.config.actions[key] as CustomAction).icon || icon;
        }
        actions.push(html`
          <pap-tab id="${key}">
            <div>
              <pap-icon container="smaller" size="small" cache="true" name="${icon}"></pap-icon>
              <pap-typography>${this.translateKey(key)}</pap-typography>
            </div>
          </pap-tab>
        `)

        if (key === "filter") {
          actions.push(html`
            <pap-tab-content id="${key}">
              <pap-table-filter @apply="${this.handlefilterapply}">
                <slot name="filter"></slot>
              </pap-table-filter>
            </pap-tab-content>
          `)
        }
        else {
          actions.push(html`
            <pap-tab-content id="${key}">
              ${key}
            </pap-tab-content>
          `)
        }
      }
    }
    return actions;
  }

  render() {
    return html`
      <pap-table-header 
        @action="${this.handleactionclick}"
        @save="${this.handlesave}"
        @search="${this.handlesearch}"
        part="header"
      ></pap-table-header>

      <pap-table-menu>
        <pap-tabs>
          ${this.actionMenus()}
        </pap-tabs>
      </pap-table-menu>

      <pap-box-template radius="medium" elevation="small" part="wrapper">
        <table part="table">
          <tr>
            <th></th>
            <th>Column A</th>
            <th>Column B</th>
            <th>Column C</th>
            <th>Column D</th>
          </tr>
          <tr>
            <th>Row A</th>
            <td>Cell AxA</td>
            <td>Cell AxB</td>
            <td>Cell AxC</td>
            <td>Cell AxD</td>
          </tr>
          <tr>
            <th>Row B</th>
            <td>Cell BxA</td>
            <td>Cell BxB</td>
            <td>Cell BxC</td>
            <td>Cell BxD</td>
          </tr>
          <tr>
            <th>Row C</th>
            <td>Cell CxA</td>
            <td>Cell CxB</td>
            <td>Cell CxC</td>
            <td>Cell CxD</td>
          </tr>
          <tr>
            <th>Row D</th>
            <td>Cell DxA</td>
            <td>Cell DxB</td>
            <td>Cell DxC</td>
            <td>Cell DxD</td>
          </tr>
        </table>
        <slot></slot>
        <footer part="footer">
          
          ${this.config.pagination ? html`<pap-pagination part="pagination" total="0"></pap-pagination>` : ''}
        </footer>
      </pap-box-template>
    `
  }
}


declare global {
  interface HTMLElementTagNameMap {
    "pap-table": Table;
  }
}