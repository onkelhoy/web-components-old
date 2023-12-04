// system 
import { html, property, query, context } from "@pap-it/system-utils";

// atoms 
import { OptionType } from "@pap-it/dropdown";
import "@pap-it/button/wc";
import "@pap-it/input/wc";
import "@pap-it/form/wc";
import "@pap-it/divider/wc";
import "@pap-it/icon/wc";
import "@pap-it/dropdown/wc";

// tools
import { Translator } from "@pap-it/tools-translator";

// local
import { style } from "./style";
import { FilterChangeEvent } from '../../types';
import { TableFilterIndividual } from "../table-filter-individual";

export class TableFilter extends Translator {
  static style = style;

  // queries
  @query('div.filters') filtersElement!: HTMLDivElement;
  @query('template') templateElement!: HTMLTemplateElement;

  // properties
  @property({ type: Boolean, rerender: false, attribute: 'is-custom-filter' }) iscustomfilters: boolean = false;
  
  // contexts
  @context() columns: OptionType[] = [];

  // event handlers
  private handlereset = () => {
    this.filtersElement.innerHTML = "";
  }
  private handlesearch = (e: Event) => {
    if (e.target instanceof HTMLElement && 'value' in e.target) {
      const value = e.target.value as string;
      this.filtersElement
        .querySelectorAll<TableFilterIndividual>('pap-table-filter-individual')
        .forEach(filter => {
          const parent = filter.parentElement;
          if (parent) {
            if (value === "" || filter.Column.startsWith(value)) {
              parent.removeAttribute("hidden");
            }
            else {
              parent.setAttribute("hidden", "true");
            }
          }
        });
    }
  }
  private handleFilterRemove = (e: Event) => {
    if (e.currentTarget instanceof HTMLElement) {
      const parent = e.currentTarget.parentElement;
      if (parent) {
        parent.parentElement?.removeChild(parent);
      }
    }
  }
  private handleApply = () => {
    if (!this.iscustomfilters) {
      const filters: FilterChangeEvent[] = [];
      this.filtersElement
        .querySelectorAll<TableFilterIndividual>('div.filter:not([hidden="true"]) > pap-table-filter-individual')
        .forEach(filter => {
          const info = filter.Info;
          if (info.filters.length > 0) filters.push(info);
        });
      this.dispatchEvent(new CustomEvent("apply", { detail: { filters } }));
    }
    else {
      this.dispatchEvent(new Event("apply"));
    }
  }
  private handleAdd = () => {
    if (!this.filtersElement) {
      console.error('[ERROR] filters not defined yet!');
      return;
    }
    if (!this.templateElement) {
      console.error('[ERROR] template not defined yet!');
      return;
    }

    const clone = this.templateElement.content.cloneNode(true);
    if (clone instanceof DocumentFragment) {
      const individual = clone.querySelector('pap-table-filter-individual');
      if (individual) {
        individual.addEventListener('remove', this.handleFilterRemove);
        this.filtersElement.appendChild(clone);
      }
    }
  }
  private handleslotchange = (e: Event) => {
    if (e.target instanceof HTMLSlotElement) {
      const assignedElements = e.target.assignedElements();

      if (assignedElements.length > 0) {
        // NOTE since this is dynamically added the first element we see if most likely another slot..
        if (assignedElements.length === 1 && assignedElements[0] instanceof HTMLSlotElement) {
          const assignedInception = assignedElements[0].assignedElements();
          if (assignedInception.length > 0) {
            this.iscustomfilters = true;
          }
        }
        else {
          this.iscustomfilters = true;
        }
      }
    }
  }

  render() {
    return html`
      <template>
        <div class="filter">
          <pap-divider></pap-divider>
          <pap-table-filter-individual columns='${JSON.stringify(this.columns)}'></pap-table-filter-individual>
        </div>
      </template>

      <main>
        <span class="dynamic">
          <pap-input @debounced-input="${this.handlesearch}" placeholder="${this.translateKey("Search...")}">
            <pap-icon slot="prefix" name="search" cache></pap-icon>
          </pap-input>

          <div class="filters"></div>

          <div class="center">
            <pap-button @click="${this.handleAdd}" variant="outlined" color="secondary">
              ${this.translateKey('Add filter')}
              <pap-icon cahce="true" name="plus-circle" slot="prefix"></pap-icon>
            </pap-button>
          </div>
        </span>

        <slot @slotchange="${this.handleslotchange}"></slot>
      </main>
      

      <footer>
        <pap-button @click="${this.handleApply}" mode="fill" color="secondary">
          ${this.translateKey("Apply filters")}
        </pap-button>
        <pap-button mode="fill" @click="${this.handlereset}" color="secondary" variant="clear">
          ${this.translateKey("Reset")}
        </pap-button>
      </footer>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pap-table-filter": TableFilter;
  }
}