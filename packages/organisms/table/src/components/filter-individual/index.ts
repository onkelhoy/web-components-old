// system 
import { debounce, html, property, query, context, generateUUID } from "@pap-it/system-utils";

// atoms
import { Select, OptionType } from "@pap-it/select";
import { Button } from '@pap-it/button';
import { Input } from '@pap-it/input';
import "@pap-it/select/wc";
import "@pap-it/button/wc";
import "@pap-it/icon/wc";
import "@pap-it/icon/wc";

// tools 
import { Translator } from "@pap-it/tools-translator";

// local
import { style } from "./style";
import { IFilter, FilterTypes, FilterChangeEvent, IColumn } from '../../types';

export class FilterIndividual extends Translator {
  static style = style;

  @query<Select>({
    selector: "pap-select",
    load: function (this: FilterIndividual) {
      this.oncolumnupdate();
    }
  }) selectElement!: Select;
  @query<HTMLTemplateElement>('template') templateElement!: HTMLTemplateElement;
  @query<HTMLDivElement>('div.fields') fieldsElement!: HTMLDivElement;

  // @property({
  //   type: Array, attribute: false, after: function (this: FilterIndividual) {
  //     this.oncolumnupdate();
  //   }
  // }) columns: OptionType[] = [];

  @context({
    update: function (this: FilterIndividual) {
      this.oncolumnupdate();
    }
  }) columns: IColumn[] = [];

  // @property({ type: Array, attribute: false, onUpdate: "oncolumnupdate" }) filters: OptionType[] = [];

  constructor() {
    super();

    this.dispatchChange = debounce(this.dispatchChange);
  }

  // properties
  public Column: string = "";
  private filters: Record<string, Partial<IFilter>> = {};
  private oldfilterArray: IFilter[] = [];

  public get Filters(): IFilter[] {
    return Object
      .values(this.filters)
      .filter(filter => {
        return filter.type && (["empty", "not-empty"].includes(filter.type) ? true : !!filter.value)
      }) as IFilter[];
  }

  public get Info(): FilterChangeEvent {
    return { column: this.Column, filters: this.Filters };
  }

  // on update 
  private oncolumnupdate = () => {
    if (!this.selectElement) return 10;

    this.selectElement.options = this.columns.map(c => ({
      text: c.title || c.id,
      value: c.id
    }));
  }

  // event handlers
  private handleselectchange = () => {
    this.Column = this.selectElement.text;
    this.dispatchChange();
    this.requestUpdate();
  }
  private handlefilterselectchange = (e: Event) => {
    if (e.currentTarget instanceof HTMLElement && 'value' in e.currentTarget) {
      const field = e.currentTarget.parentElement;
      const uuid = field?.getAttribute('data-uuid');
      if (uuid) {
        const current = this.filters[uuid];
        const type = e.currentTarget.value as FilterTypes
        if (["empty", "not-empty"].includes(type)) {
          this.filters[uuid] = { type };
        }
        else {
          this.filters[uuid] = { ...current, type };
        }
        this.dispatchChange();
      }
    }
  }
  private handleremoveall = () => {
    this.dispatchEvent(new Event('remove'));
  }
  private handleremove = (e: Event) => {
    if (e.currentTarget instanceof HTMLElement) {
      const field = e.currentTarget.parentElement;
      if (field) {
        const uuid = field.getAttribute('data-uuid');
        if (uuid) {
          delete this.filters[uuid];
        }
        field.parentElement?.removeChild(field);
        this.dispatchChange();
      }
    }
  }
  private handlevaluechange = (e: Event) => {
    if (e.currentTarget instanceof HTMLElement && 'value' in e.currentTarget) {
      const field = e.currentTarget.parentElement;
      const uuid = field?.getAttribute('data-uuid');
      if (uuid) {
        const current = this.filters[uuid] || {};
        this.filters[uuid] = { ...current, value: e.currentTarget.value as string };

        this.dispatchChange();
      }
    }
  }
  private handleplusclick = () => {
    if (!this.fieldsElement) {
      console.error('[ERROR] fields not defined yet!');
      return;
    }
    if (!this.templateElement) {
      console.error('[ERROR] template not defined yet!');
      return;
    }

    const clone = this.templateElement.content.cloneNode(true);

    if (clone instanceof DocumentFragment) {
      const select = clone.querySelector<Select>('pap-select');
      if (select) {
        select.onchange = this.handlefilterselectchange;
      }

      const button = clone.querySelector<Button>("pap-button");
      if (button) {
        button.onclick = this.handleremove;
      }

      const input = clone.querySelector<Input>("pap-input");
      if (input) {
        input.addEventListener('debounced-input', this.handlevaluechange);
      }

      const div = clone.querySelector('div.field');
      if (div) {
        const uuid = generateUUID();
        div.setAttribute('data-uuid', uuid);
        this.filters[uuid] = {};
      }
    }
    this.fieldsElement.appendChild(clone);
  }

  // helper
  private areFiltersEqual(filters: IFilter[]) {
    // Step 1: Check if arrays have the same length
    if (filters.length !== this.oldfilterArray.length) {
      return false;
    }

    // Step 2: Create a comparator function
    const comparator = (a: IFilter, b: IFilter) => a.type === b.type && a.value === b.value;

    // Step 3: Compare arrays
    for (const item1 of filters) {
      if (!this.oldfilterArray.some(item2 => comparator(item1, item2))) {
        return false;
      }
    }

    return true;
  }
  private dispatchChange = () => {
    if (this.Column) {
      const currentFilters = this.Filters;
      if (!this.areFiltersEqual(currentFilters)) {
        this.oldfilterArray = currentFilters;
        this.dispatchEvent(new CustomEvent<FilterChangeEvent>("change", { detail: { column: this.Column, filters: currentFilters } }))
      }
    }
  }

  render() {
    return html`
      <template>
        <div class="field">
          <pap-icon name="sub-arrow" cache="true"></pap-icon>
          <pap-select dynamic-width="true">
            <pap-option value="contains">${this.translateKey("Contains")}</pap-option>
            <pap-option value="not-contains">${this.translateKey("Not Contains")}</pap-option>
            <pap-option value="equals">${this.translateKey("Equals")}</pap-option>
            <pap-option value="not-equals">${this.translateKey("Not Equals")}</pap-option>
            <pap-option value="starts-with">${this.translateKey("Starts With")}</pap-option>
            <pap-option value="ends-with">${this.translateKey("Ends With")}</pap-option>
            <pap-option value="empty">${this.translateKey("Empty")}</pap-option>
            <pap-option value="not-empty">${this.translateKey("Not Empty")}</pap-option>
          </pap-select>
          <pap-input @debounced-input="${this.handlevaluechange}"></pap-input>
          <pap-button circle="true" color="secondary" variant="clear">
            <pap-icon name="trash" cache="true"></pap-icon>
          </pap-button>
        </div>
      </template>

      <div class="bottom-align">
        <pap-select @change="${this.handleselectchange}" label="${this.translateKey("Column")}"></pap-select>
        <pap-button @click="${this.handleremoveall}" circle="true" color="secondary" variant="clear">
          <pap-icon name="trash" cache="true"></pap-icon>
        </pap-button>
      </div>
      
      <div class="fields"></div>

      <div class="center">
        <pap-button color="secondary" variant="clear" circle="true" @click="${this.handleplusclick}">
          <pap-icon cache="true" name="plus-circle"></pap-icon>
        </pap-button>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pap-table-filter-individual": FilterIndividual;
  }
}