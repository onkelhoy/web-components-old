// utils 
import { html, property, query, debounce, ifDefined } from "@pap-it/system-utils";

// atoms
import '@pap-it/icon/wc';

// templates
import { TextinputTemplate } from '@pap-it/templates-textinput';
import { Placement, Popover } from "@pap-it/templates-popover";
import '@pap-it/templates-popover/wc';
import '@pap-it/templates-box/wc';

// tools
import "@pap-it/tools-translator/wc";

// local 
import { style } from "./style";
import { IOption, OptionType } from "./types";
import { Option } from "./components/option";

export class Dropdown extends TextinputTemplate<HTMLInputElement> {
  static style = style;

  @property({ rerender: false, type: Boolean }) multiple: boolean = false;
  @property() placement: Placement = "bottom-left";
  @property({ type: Boolean }) search: boolean = false;
  @property({ type: Array, rerender: false, onUpdate: "onoptionupdate" }) options?: Array<OptionType>;
  @property({ rerender: false, type: Boolean }) popoveropen: boolean = false;

  @query('pap-popover-template') popoverElement!: Popover;

  private __options: IOption[] = [];
  private handleafterupdate_attemps = 0;

  public get values() {
    return this.value.split(',').map(v => v.trim()).filter(v => !!v);
  };
  public set values(values: string[]) {
    this.value = values.join(',');
  };

  // class functions
  constructor() {
    super();

    this.debouncedCheckValue = debounce(this.checkValue, 100);
    this.addEventListener('after-update', this.handleafterupdate);
  }

  // private functions
  private debouncedCheckValue() { };
  private checkValue = () => {

    let newvalues = [...this.values];
    for (let i = 0; i < newvalues.length; i++) {
      if (!this.__options.find(o => newvalues[i] === o.value)) {
        newvalues.splice(i, 1);
        i--;
      }
    }

    this.values = newvalues;

    // calling after update bcs the values did not trigger the onvalueupdate to be triggered when init 
    this.handleafterupdate();
  }

  // public functions
  public registerOption(element: Option) {
    if (!element.hasAttribute('data-dropdown-option')) {
      element.setAttribute('data-dropdown-option', 'true');
      element.addEventListener('click', this.handleoptionclick);

      const value = element.getValue();
      if (!this.__options.some(o => o.value === value)) {
        this.__options.push({ text: element.getText(), value });
      }

      this.debouncedCheckValue();
    }
  }
  public get Text() {
    if (!this.inputElement) return "";
    return this.inputElement.value;
  }

  // on updates
  private onoptionupdate = () => {
    if (this.options) {
      this.__options = this.options.map(value => {
        if (typeof value === "number") return { text: value.toString(), value: value.toString() }
        if (typeof value === "boolean") return { text: value.toString(), value: value.toString() }
        if (typeof value === "string") return { text: value, value }
        return value;
      });

      this.handleafterupdate();
      this.debouncedRequestUpdate();
    }
  }

  // event handlers  
  override handlefocus = () => {
    this.hasFocus = true;
    if (!this.popoverElement.open) this.popoverElement.show();
  }
  private handleoptionclick = (e: Event) => {
    if (e instanceof CustomEvent) {

      let values = this.values;
      const index = values.findIndex(v => v === e.detail.value);
      if (index >= 0) {
        values.splice(index, 1);
      }
      else {
        if (!this.multiple) {
          // always clear it
          values = [];
        }
        values.push(e.detail.value);
      }

      this.values = values;
    }
  }
  private handleShow = () => {
    this.popoveropen = true;
  }
  private handleHide = () => {
    this.popoveropen = false;
  }

  private handleafterupdate = () => {
    if (!this.inputElement) return;

    const values = this.values;
    const texts = new Array<string>();
    values.forEach(v => {
      const option = this.__options.find(o => o.value === v);
      if (option) {
        texts.push(option.text);
      }
    })

    const text = texts.join(', ');
    if (text.length > 25 && texts.length > 1)
      this.inputElement.value = `${texts.length} items selected`; // TODO should be translated.. 
    else
      this.inputElement.value = text;
  }

  render() {
    const superrender = super.render(html`
      <input 
        @click="${this.handlekeyup}" 
        @keyup="${this.handlekeyup}" 
        data-tagname="select"
        readonly="${ifDefined(this.search ? undefined : true)}"
        placeholder="${ifDefined(this.placeholder)}" 
        value="${ifDefined(this.value)}"
      />
      <pap-icon slot="suffix" customsize="13" name="caret">^</pap-icon>
    `);

    return html`
      <pap-popover-template @show="${this.handleShow}" @hide="${this.handleHide}" revealby="click">
        <span part="button" slot="target">
          ${superrender}
        </span>
        <pap-box-template part="menu" class="options" radius="small" elevation="small">
          <slot>
            ${this.__options.map(v => html`<pap-option key="${v.value}" value="${v.value}">${v.text}</pap-option>`)}
            ${this.__options?.length === 0 ? '<pap-option disabled key="missing-value"><pap-translator>Missing Options</pap-translator></pap-option>' : ''}
          </slot>
        </pap-box-template>
      </pap-popover-template>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pap-dropdown": Dropdown;
  }
}